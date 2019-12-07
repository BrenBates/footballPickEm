$(document).ready(function () {
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
    $.get("api/games", function (games) {

      var gamesToAdd = [];
      for (var i = 0; i < games.length; i++) {
        gamesToAdd.push(createNewRow(games[i]));
      }
      createNewRow(gamesToAdd);
      gamesContainer.append(gamesToAdd);
    });

    let $buttons = document.getElementsByClassName("button");

    for (let button of $buttons) {
      button.addEventListener('click', () => {
        let duration = 0.3;
        let delay = 0.08;
        TweenMax.to(button, duration, { scaleY: 1.6, ease: Expo.easeOut });
        TweenMax.to(button, duration, { scaleX: 1.2, scaleY: 1, ease: Back.easeOut, easeParams: [3], delay: delay });
        TweenMax.to(button, duration * 1.25, { scaleX: 1, scaleY: 1, ease: Back.easeOut, easeParams: [6], delay: delay * 3 });
      });
    };
  }

            // <div class="col-md-2">
            //     <div class="button">
            //         <div class="col">
            //             <img id="teamlogo" src="./images/AZ.png" alt="Arizona Cardinals">
            //         </div>
            //         <div class="col">
            //             AT
            //         </div>
            //         <div class="col">
            //             <img id="teamlogo" src="./images/LAR.png" alt="LA Rams">
            //         </div>
            //     </div>
            // </div>

  // Function to construct a post's HTML
  function createNewRow(games) {
    let teamImgSrc = "";
    let teamAlt = "";
    let newColumn = $('<div>').addClass('col-md-2');
    let newButton = $('<div>').addClass('button');
    let newButtonColumn = $('<div>').addClass('col');
    let newImage = $('<img>').attr('id', 'teamlogo');
    newImage.attr('src', games.homeTeam);
    newImage.attr('alt', games.homeTeam);

    return newColumn;
  }

  function renderEmpty() {
    var massageH2 = $("<div>");
    massageH2.addClass("alert alert-danger");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.text("No games have yet to be seeded into the db.");
    gamesContainer.append(messageH2);
  }

  let handleSelectGame = function () {
    event.preventDefault();

    let nflGameId = $(this).attr("nflGameId");



    $.ajax({
      url: "/profile",
      type: "GET",
      beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', sessionStorage.jwt); },

    }).then(function (response) {

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
  $(document).on("click", "#closeGameCreated", function () {
    event.preventDefault();
    let modal = $('#modalGameCreated').modal('hide');
    location.reload();
  })

});

