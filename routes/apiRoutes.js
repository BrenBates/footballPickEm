/* eslint-disable prettier/prettier */
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
        
        
        // console.log(response.data.gameScores[0].gameSchedule.gameId);
  
        for (let i = 0; i < response.data.gameScores.length; i++) {
          //let gameSchedule = response.data.gameScores[i].gameSchedule;
          // let scores = response.data.gameScores[i].scores;
        
          

          var tempObj = {
            gameID: response.data.gameScores[i].gameSchedule.gameId,
            homeTeam: response.data.gameScores[i].gameSchedule.homeTeam.fullName,
            firstQsHome: response.data.gameScores[i].score.homeTeamScore.pointQ1,
            secondQsHome: response.data.gameScores[i].score.homeTeamScore.pointQ2,
            thirdQsHome: response.data.gameScores[i].score.homeTeamScore.pointQ3,
            forthQsHome: response.data.gameScores[i].score.homeTeamScore.pointQ4,
            finalScoreHome: response.data.gameScores[i].score.homeTeamScore.pointTotal,
            awayTeam: response.data.gameScores[i].gameSchedule.visitorTeam.fullName,
            firstQsAway: response.data.gameScores[i].score.visitorTeamScore.pointQ1,
            secondQsAway: response.data.gameScores[i].score.visitorTeamScore.pointQ2,
            thirdQsAway: response.data.gameScores[i].score.visitorTeamScore.pointQ3,
            forthQsAway: response.data.gameScores[i].score.visitorTeamScore.pointQ4,
            finalScoreAway: response.data.gameScores[i].score.visitorTeamScore.pointTotal
          };
          console.log(tempObj);
           db.games.create(tempObj);
        }
  
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
