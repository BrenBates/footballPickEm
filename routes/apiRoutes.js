var db = require("../models");
var axios = require("axios");

module.exports = function(app) {
  // Get all examples
  app.get("/games", function(req, res) {
    db.games.findAll({}).then(function(dbGames) {
      res.json(dbGames);
    });
  });

  // Route to specific game that is chosen //
  // app.get("/games/:game", function(req, res) {
  //   var chosen = req.params.games;
  //   console.log(chosen);

  //   for (var i = 0; i < games.length; i++) {
  //     if (chosen === games[i].routeName) {
  //       return res.json(games[i]);
  //     }
  //   }
  //   return res.send("No game found");
  // });

  // Seed db with JSON data from API
  app.post("/api/games", function(req, res) {
    var queryUrl = "https://feeds.nfl.com/feeds-rs/scores.json";

    axios
      .get(queryUrl)
      .then(function(response) {
        for (var i = 0; i < response.gameScores.length; i++) {
          var gameSchedule = response[i].gameSchedule;
          var scores = response[i].scores;
          var tempObj = {
            gameID: gameSchedule.gameId,
            homeTeam: gameSchedule.homeTeam.fullName,
            firstQsHome: scores.homeTeamScore.pointQ1,
            secondQsHome: scores.homeTeamScore.pointQ2,
            thirdQsHome: scores.homeTeamScore.pointQ3,
            forthQsHome: scores.homeTeamScore.pointQ4,
            finalScoreHome: scores.homeTeamScore.pointTotal,
            awayTeam: gameSchedule.awayTeam.fullName,
            firstQsAway: scores.awayTeamScore.pointQ1,
            secondQsAway: scores.awayTeamScore.pointQ2,
            thirdQsAway: scores.awayTeamScore.pointQ3,
            forthQsAway: scores.awayTeamScore.pointQ4,
            finalScoreAway: scores.awayTeamScore.pointTotal
          };
        }
        console.log("This is the obj: " + tempObj);
        db.games.create(tempObj);
      })
      .catch(function(error) {
        if (error.response) {
          console.log(response);
        }
        res.status(500);
      });
  });
};

// app.post("/api/games/:gameId", function(req, res) {
//   var queryUrl = "http://www.nfl.com/liveupdate/game-center/2019120111/2019120111_gtd.json";

//   axios
//     .get(queryUrl)
//     .then(function(response) {
//       for (var i = 0; i < response.gameScores.length; i++) {
//         var gameSchedule = response[i].gameSchedule;
//         var scores = response[i].scores;
//         var tempObj = {
//           gameID: gameSchedule.gameId,
//           homeTeam: gameSchedule.homeTeam.fullName,
//           firstQsHome: scores.homeTeamScore.pointQ1,
//           secondQsHome: scores.homeTeamScore.pointQ2,
//           thirdQsHome: scores.homeTeamScore.pointQ3,
//           forthQsHome: scores.homeTeamScore.pointQ4,
//           finalScoreHome: scores.homeTeamScore.pointTotal,
//           awayTeam: gameSchedule.awayTeam.fullName,
//           firstQsAway: scores.awayTeamScore.pointQ1,
//           secondQsAway: scores.awayTeamScore.pointQ2,
//           thirdQsAway: scores.awayTeamScore.pointQ3,
//           forthQsAway: scores.awayTeamScore.pointQ4,
//           finalScoreAway: scores.awayTeamScore.pointTotal
//         };
//       }
//     })
//     .catch(function(error) {
//       if (error.response) {
//         console.log(response);
//       }
//       res.status(500);
//     });
// });
// };

// Delete an example by id
// app.delete("/api/examples/:id", function(req, res) {
//   db.Example.destroy({ where: { id: req.params.id } }).then(function(
//     dbExample
//   ) {
//     res.json(dbExample);
//   });
// });
