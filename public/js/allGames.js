$(document).ready(function () {
  // gamesContainer holds all of the games
  var gamesContainer = $(".games-container");

  // Click events for the select games buttons
  // $(document).on("click", "button.select", handleSelectGame);
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
      console.log(games.data);
      // var gamesToAdd = [];
      // for (var i = 0; i < games.length; i++) {
      //   gamesToAdd.push(createNewRow(games[i]));
      // }
      // createNewRow(gamesToAdd);
      // gamesContainer.append(gamesToAdd);
    });

    // <div class="col-sm-4">
    //   <div class="card" id="game16">
    //     <div class="card-body">
    //       <h5 class="card-title">Home Team 16</h5>
    //       <h5 class="card-title">Away Team 16</h5>
    //       <a href="#" class="btn btn-primary">Select Game</a>
    //     </div>
    //   </div>
    // </div>

    // // Function to construct a post's HTML
    // function createNewRow(games) {
    //   let newGameCardCol = $("<div>").addClass("col-sm-4");
    //   let newGameCard = $("<div>").addClass("card");
    //   let newGameCardHeading = $("<div>").addClass("card-header");
    //   let newGameCardBody = $("<div>").addClass("card-body");
    //   let newHomeTeamBody = $("<h5>");
    //   let newAwayTeamBody = $("<h5>");
    //   let selectBtn = $("<button>").addClass("select btn btn-default");

    //   newGameCardHeading.text(games.gameId);
    //   newHomeTeamBody.text(games.homeTeam);
    //   newAwayTeamBody.text(games.awayTeam);
    //   selectBtn.text("Select");
    //   newGameCardBody.append(selectBtn);
    //   newGameCardBody.append(newAwayTeamBody);
    //   newGameCardBody.append(newHomeTeamBody);
    //   newGameCard.append(newGameCardBody);
    //   newGameCard.data("games", games);
    //   return newGameCard;
    // }


    // function createNewRow(games) {
    //   var newGameCard = $("<div>");
    //   newGameCard.addClass("card");
    //   var newGameCardHeading = $("<div>");
    //   newGameCardHeading.addClass("card-header");
    //   var newGameCardBody = $("<div>");
    //   newGameCardBody.addClass("card-body");
    //   var newHomeTeamBody = $("<h5>");
    //   var newAwayTeamBody = $("<h5>");
    //   var selectBtn = $("<button>");
    //   selectBtn.addClass("select btn btn-default");
    //   newGameCardHeading.text(games.gameId);
    //   newHomeTeamBody.text(games.homeTeam);
    //   newAwayTeamBody.text(games.awayTeam);
    //   selectBtn.text("Select");
    //   newGameCardBody.append(selectBtn);
    //   newGameCardBody.append(newAwayTeamBody);
    //   newGameCardBody.append(newHomeTeamBody);
    //   newGameCard.append(newGameCardBody);
    //   newGameCard.data("games", games);
    //   return newGameCard;
    // }

    function renderEmpty() {
      var massageH2 = $("<div>");
      massageH2.addClass("alert alert-danger");
      messageH2.css({ "text-align": "center", "margin-top": "50px" });
      messageH2.text("No games have yet to be seeded into the db.");
      gamesContainer.append(messageH2);
    }

    // function handleSelectGame() {
    //   var currentGame = $(this)
    //     .parent()
    //     .parent()
    //     .data("games");
    //   window.location.href = "/viewgames?gameId=" + currentGameId;
    // }
  }
});
