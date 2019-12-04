var db = require("../models");
var axios = require("axios");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });


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
          console.log('hello')
          
          let currentWeek = response.data.week;
          console.log('this is the current week', currentWeek)

          if(response.data.gameScores[i].score === null){
            var tempObj = {

              gameId: response.data.gameScores[i].gameSchedule.gameId,
              week: response.data.week,
              homeTeam: response.data.gameScores[i].gameSchedule.homeTeam.fullName,
              firstQsHome: null,
              secondQsHome: null,
              thirdQsHome: null,
              forthQsHome: null,
              finalScoreHome: null,
              awayTeam: response.data.gameScores[i].gameSchedule.visitorTeam.fullName,
              firstQsAway: null,
              secondQsAway: null,
              thirdQsAway: null,
              forthQsAway: null,
              finalScoreAway: null,
              gameStatus: 'active'

            }
            console.log(tempObj);
          } else {

          var tempObj = {
          
            gameId: response.data.gameScores[i].gameSchedule.gameId,
            week: response.data.week,
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
            finalScoreAway: response.data.gameScores[i].score.visitorTeamScore.pointTotal,
            gameStatus: 'active'
          };
        }
          console.log(tempObj);
          db.games.destroy({
            where: {
              gameStatus: 'active'
            }
          })

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


  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });

  });

 
};
