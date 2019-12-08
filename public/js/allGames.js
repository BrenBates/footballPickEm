$(document).ready(function () {
  // gamesContainer holds all of the games
  var gamesContainer = $(".games-container");
  function whichTeamImage(team) {
    for (var i = 0; i < 32; i++) {
      if (team === "Dallas Cowboys") {
        return "./images/DAL.png"
      }
      if (team === "Chicago Bears") {
        return "./images/CHI.png"
      }
      if (team === "Carolina Panthers") {
        return "./images/CAR.png"
      }
      if (team === "Atlanta Falcons") {
        return "./images/ATL.png"
      }
      if (team === "Baltimore Ravens") {
        return "./images/BAL.png"
      }
      if (team === "Buffalo Bills") {
        return "./images/BUF.png"
      }
      if (team === "Cincinnati Bengals") {
        return "./images/CIN.png"
      }
      if (team === "Cleveland Browns") {
        return "./images/CLE.png"
      }
      if (team === "Washington Redskins") {
        return "./images/WAS.png"
      }
      if (team === "Green Bay Packers") {
        return "./images/GB.png"
      }
      if (team === "Denver Broncos") {
        return "./images/DEN.png"
      }
      if (team === "Houston Texans") {
        return "./images/HOU.png"
      }
      if (team === "Detroit Lions") {
        return "./images/DET.png"
      }
      if (team === "Minnesota Vikings") {
        return "./images/MIN.png"
      }
      if (team === "San Francisco 49ers") {
        return "./images/SF.png"
      }
      if (team === "New Orleans Saints") {
        return "./images/NO.png"
      }
      if (team === "Miami Dolphins") {
        return "./images/MIA.png"
      }
      if (team === "New York Jets") {
        return "./images/NYJ.png"
      }
      if (team === "Indianapolis Colts") {
        return "./images/IND.png"
      }
      if (team === "Tampa Bay Buccaneers") {
        return "./images/TB.png"
      }
      if (team === "Los Angeles Chargers") {
        return "./images/LAC.png"
      }
      if (team === "Jacksonville Jaguars") {
        return "./images/JAX.png"
      }
      if (team === "Pittsburgh Steelers") {
        return "./images/PIT.png"
      }
      if (team === "Arizona Cardinals") {
        return "./images/AZ.png"
      }
      if (team === "Kansas City Chiefs") {
        return "./images/KC.png"
      }
      if (team === "New England Patriots") {
        return "./images/NE.png"
      }
      if (team === "Tennessee Titans") {
        return "./images/TEN.png"
      }
      if (team === "Oakland Raiders") {
        return "./images/OAK.png"
      }
      if (team === "Seattle Seahawks") {
        return "./images/SEA.png"
      }
      if (team === "Los Angeles Rams") {
        return "./images/LA.png"
      }
      if (team === "New York Giants") {
        return "./images/NYG.png"
      }
      if (team === "Philadelphia Eagles") {
        return "./images/PHI.png"
      }
      else null
    }
  }
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
      //createNewRow(gamesToAdd);
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
    //let newColumn = $('<div>').addClass('col');
    let newButton = $('<div>').addClass('button');
    let firstColumn = $('<div>').addClass('col');
    let secondColumn = $('<div>').addClass('col');
    let thirdColumn = $('<div>').addClass('col');
    let awayImage = $('<img>').attr('id', 'teamlogo');
    let homeImage = $('<img>').attr('id', 'teamlogo');
    awayImage.attr('src', whichTeamImage(games.awayTeam));
    awayImage.attr('alt', games.awayTeam);
    homeImage.attr('src', whichTeamImage(games.homeTeam));
    homeImage.attr('alt', games.homeTeam);
    firstColumn.append(homeImage);
    secondColumn.append("AT");
    thirdColumn.append(awayImage);
    newButton.addClass('col-md-4');
    newButton.append(firstColumn);
    newButton.append(secondColumn);
    newButton.append(thirdColumn);
    //newColumn.append(newButton);
    
    console.log(newButton);
    return newButton;
  }

  function teamButton() {

  }

  function renderEmpty() {
    var messageH2 = $("<div>");
    messageH2.addClass("alert alert-danger");
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

