$(document).ready(function() {
  // gamesContainer holds all of the games
  var userGamesContainer = $("#userGames");

  
loadUserGames();
  

  // InitializeGames handles appending all of the games post HTML inside gameContainer
  function loadUserGames() {

      $.ajax({
          url: "/profile",
          type: "GET",
          beforeSend: function(xhr){xhr.setRequestHeader('Authorization', sessionStorage.jwt);},
          
        }).then(function(response) {

          let userId = response.id;
     
      let data = {
        userId: userId
      }

    $.get("api/usergames", data, function(userGames) {
      
      console.log(userGames);
      var userGamesToAdd = [];
      for (var i = 0; i < userGames.length; i++) {
        userGamesToAdd.push(createNewUserGamesRow(userGames[i]));
      }

      console.log(userGamesToAdd[0]);
      createNewUserGamesRow(userGamesToAdd);
      userGamesContainer.append(userGamesToAdd);
      
    });
  })
  }

    // Function to construct a post's HTML
    function createNewUserGamesRow(userGames) {
      var newUserGameCard = $("<div>");
      newUserGameCard.addClass("card");
      var newUserGameCardHeading = $("<div>");
      newUserGameCardHeading.addClass("card-header");
      var newUserGameCardBody = $("<div>");
      newUserGameCardBody.addClass("card-body");
      var newUserHomeTeamBody = $("<h5>");
      var newUserBodyVs = $("<p>");
      var newUserAwayTeamBody = $("<h5>");
      var newUserWeekBody = $("<h5>");
      var userSelectBtn = $("<button>");
      userSelectBtn.addClass("select btn btn-danger");
      userSelectBtn.attr('userGamesId', userGames.userGameId);
      // userSelectBtn.attr('userfirstQsScore', userGames.firstQsHome);
      newUserGameCardHeading.text("Week: " + userGames.week);
      newUserHomeTeamBody.text(userGames.homeTeam + ": " + userGames.finalScoreHome);
      newUserBodyVs.text("vs.");
      newUserAwayTeamBody.text(userGames.awayTeam + ": " + userGames.finalScoreAway);
      // newUserWeekBody.text("Week: " +userGames.week);
      userSelectBtn.text("Select");
      newUserGameCardBody.append(newUserGameCardHeading);
      newUserGameCardBody.append(newUserWeekBody);
      newUserGameCardBody.append(newUserAwayTeamBody);
      newUserGameCardBody.append(newUserWeekBody);
      newUserGameCardBody.append(newUserHomeTeamBody);
      newUserGameCardBody.append(userSelectBtn);
      newUserGameCard.append(newUserGameCardBody);
      newUserGameCard.data("games", userGames);
      return newUserGameCard;
    }

  //   function renderEmpty() {
  //     var massageH2 = $("<div>");
  //     massageH2.addClass("alert alert-danger");
  //     messageH2.css({ "text-align": "center", "margin-top": "50px" });
  //     messageH2.text("No games have yet to be seeded into the db.");
  //     gamesContainer.append(messageH2);
  //   }

    let handleUserGame = function() {

      let userGameId = $(this).attr("userGamesId");
      
      // console.log('WTF IS this is the user games Id', userGameId);
      // var lastdigit = number.toString().split('').pop();
      // console.log("Last Digit: " + lastdigit);
      // getLastDigitScore();

      $.post("/api/refresh/" + userGameId );
      window.location.href = "/usergames/" + userGameId
      
    }

    $(document).on("click", ".select", handleUserGame);

    // function getLastDigitScore(userGames) {
    //   var number = userGames.firstQsHome;
    //   var lastdigit = number.toString().split('').pop();
    //   console.log("This is the last digit: " + lastdigit);
    //   // return lastdigit;
    // }

 
});
