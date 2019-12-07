$(document).ready(function() {
  // gamesContainer holds all of the games
  var gamesContainer = $(".games-container");

  // Click events for the select games buttons
  
initializeRow();
  // Get the initial list of games
  // getGames();

  // // Function to grab all of the games from the DB based on status and update the views
  // function getGames(gameStatus) {
  //   var statusString = gameStatus || "";
  //   if (statusString) {
  //     statusString = "/gameStatus/" + statusString;
  //   }
  //   $.get("/api/games" + statusString, function(data) {
  //     // console.log("games", data);
  //     games = data;
  //     if (!games || !games.length) {
  //       displayEmpty();
  //     } else {
  //       initializeRow();
  //     }
  //   });
  // }

  // InitializeGames handles appending all of the games post HTML inside gameContainer
  function initializeRow() {
    $.get("api/games", function(games) {
      
      var gamesToAdd = [];
      for (var i = 0; i < games.length; i++) {
        gamesToAdd.push(createNewRow(games[i]));
      }
      createNewRow(gamesToAdd);
      gamesContainer.append(gamesToAdd);
    });
  }

    // Function to construct a post's HTML
    function createNewRow(games) {
      var newGameCard = $("<div>");
      newGameCard.addClass("card");
      var newGameCardHeading = $("<div>");
      newGameCardHeading.addClass("card-header");
      var newGameCardBody = $("<div>");
      newGameCardBody.addClass("card-body");
      var newHomeTeamBody = $("<h5>");
      var newAwayTeamBody = $("<h5>");
      var selectBtn = $("<button>");
      selectBtn.addClass("select btn btn-default");
      selectBtn.attr('nflGameId',games.gameId);
      selectBtn.attr('data-toggle','modal');
      selectBtn.attr('data-target','#modalGameCreated');
      newGameCardHeading.text(games.gameId);
      newHomeTeamBody.text(games.homeTeam);
      newAwayTeamBody.text(games.awayTeam);
      selectBtn.text("Select");
      newGameCardBody.append(newGameCardHeading);
      newGameCardBody.append(selectBtn);
      newGameCardBody.append(newAwayTeamBody);
      newGameCardBody.append(newHomeTeamBody);
      newGameCard.append(newGameCardBody);
      newGameCard.data("games", games);
      return newGameCard;
    }

    function renderEmpty() {
      var massageH2 = $("<div>");
      massageH2.addClass("alert alert-danger");
      messageH2.css({ "text-align": "center", "margin-top": "50px" });
      messageH2.text("No games have yet to be seeded into the db.");
      gamesContainer.append(messageH2);
    }

    let handleSelectGame = function() {
      event.preventDefault();
      
       let nflGameId = $(this).attr("nflGameId");
       
      

      $.ajax({
        url: "/profile",
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', sessionStorage.jwt);},
        
      }).then(function(response) {
  
        let userId = response.id;
        console.log('this is the user ID')
        console.log(userId);
        console.log(nflGameId);
        let data = {
          userId: userId,
          nflGameId: nflGameId
        }
        console.log('this is the data')
        console.log(data);

        $.post("/api/usergames", data)

      })

      // var currentGame = $(this)
      //   .parent()
      //   .parent()
      //   .data("games");
      // window.location.href = "/viewgames?gameId=" + currentGameId;

    }

    $(document).on("click", ".select", handleSelectGame);
    $(document).on("click", "#closeGameCreated", function() {
      event.preventDefault();
      let modal = $('#modalGameCreated').modal('hide');
      location.reload();
    })

});

