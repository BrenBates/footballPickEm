/* eslint-disable prettier/prettier */
var db = require("../models");
var axios = require("axios");
module.exports = function(app) {
  // Get all matchup examples
  app.get("/api/games", function(req, res) {
    db.games.findAll({}).then(function(dbGames) {
      res.json(dbGames);
    });
  });

   // Get all usergame examples
   app.get("/api/usergames", function(req, res) {
     
    let userId = req.query.userId;
    
    db.usergames.findAll({
      where: {
        userId: userId
      }
    }).then(function(dbUserGames) {
      res.json(dbUserGames);
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
        for (let i = 0; i < response.data.gameScores.length; i++) {
          let currentWeek = response.data.week;
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
              gameStatus: 'inactive'
            }
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
            gameStatus: 'inactive'
          };
        }
    //Run a find or create based on gameId to add the game to the database if it doesn't exist. 
  db.games.findOrCreate({where: {gameId: response.data.gameScores[i].gameSchedule.gameId }, defaults: tempObj})
  .spread((games, created) => {
    // console.log(games.get({
    //   plain: true
    // }))
    // console.log(created)
  })
        }
          // Update all of the games to be inactive
          db.games.update({
            gameStatus: 'inactive'
          }, {
            where: {
              gameStatus: 'active'
            }
          })
          // Now that they are all inactive, update the current week games to have an active game status
          db.games.update({
            gameStatus: 'active'
          }, {
            where: {
              week: response.data.week
            }
          })
      })
      .catch(function(error) {
        if (error.response) {
          console.log(response);
        }
        res.status(500);
      });
  });

  app.post("/api/usergames", function(req,res) {

    let userId = req.body.userId
    let nflGameId = req.body.nflGameId

    // function to shuffle array of numbers to assign them randomly to the columns and rows for the game
    function shuffle(array) {
      var currentIndex = array.length,
          temporaryValue, randomIndex;
  
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
  
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
  
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
      }
  
      return array;
  }
    let randomColumn = shuffle([0, 1, 2 ,3, 4, 5, 6, 7, 8, 9]);
    let randomRow = shuffle([0, 1, 2 ,3, 4, 5, 6, 7, 8, 9]);
   

    db.games.findOne({
      where: {
        gameId: nflGameId
      }
    }).then(function(dbGames) {
      // console.log(dbGames)
  
      let userWeek = dbGames.dataValues.week;
      let userHomeTeam = dbGames.dataValues.homeTeam;
      let userAwayTeam = dbGames.dataValues.awayTeam;
      let userFirstQsHome = dbGames.dataValues.firstQsHome;
      let userSecondQsHome = dbGames.dataValues.secondQsHome;
      let userThirdQsHome = dbGames.dataValues.thirdQsHome;
      let userForthQsHome = dbGames.dataValues.forthQsHome;
      let userFirstQsAway = dbGames.dataValues.firstQsAway;
      let userSecondQsAway = dbGames.dataValues.secondQsAway;
      let userThirdQsAway = dbGames.dataValues.thirdQsAway;
      let userForthQsAway = dbGames.dataValues.forthQsAway;
    

    var temporaryObj = {
  
    userId: userId,
    nflGameId: nflGameId,
    week: userWeek,
    homeTeam: userHomeTeam,
    awayTeam: userAwayTeam,
    firstQsHome: userFirstQsHome,
    secondQsHome: userSecondQsHome,
    thirdQsHome: userThirdQsHome,
    forthQsHome: userForthQsHome,
    firstQsAway: userFirstQsAway,
    secondQsAway: userSecondQsAway,
    thirdQsAway: userThirdQsAway,
    forthQsAway: userForthQsAway,
    a: randomColumn[0],
    b: randomColumn[1],
    c: randomColumn[2],
    d: randomColumn[3],
    e: randomColumn[4],
    f: randomColumn[5],
    g: randomColumn[6],
    h: randomColumn[7],
    i: randomColumn[8],
    j: randomColumn[9],
    one: randomRow[0],
    two: randomRow[1],
    three: randomRow[2],
    four: randomRow[3],
    five: randomRow[4],
    six: randomRow[5],
    seven: randomRow[6],
    eight: randomRow[7],
    nine: randomRow[8],
    ten: randomRow[9]
  }

  console.log(temporaryObj);
  db.usergames.create(temporaryObj);
})
  })
  
};
