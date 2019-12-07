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

 

  // app.post("/api/usergames/:usergameid", function(req,res) {
  //   let userGameId = req.params.usergameid
  //   console.log("this is the user game id: ")
  //   console.log(userGameId);
  //   db.usergames.findOne({
  //     where: {
  //       userGameId: req.params.usergameid
  //     }
  //   }).then(function(dbUGI) {


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

  app.post("api/usergames/refresh", function(req, res) {
    let nflGameID = req.body.nflGameId
    console.log(nflGameID);
    let queryUrl = "http://www.nfl.com/liveupdate/game-center/" + nflGameId + "/" + nflGameId + "_gtd.json";
    axios
      .get(queryUrl)
        .then(function(response) {
          let refreshObj = {
            firstQsHome: response.data[nflGameId].home.score[1],
            secondQsHome: response.data[nflGameId].home.score[2],
            thirdQsHome: response.data[nflGameId].home.score[3],
            forthQsHome: response.data[nflGameId].home.score[4],
            finalScoreHome: response.data[nflGameId].home.score.T,
            firstQsAway: response.data[nflGameId].away.score[1],
            secondQsAway: response.data[nflGameId].away.score[2],
            thirdQsAway: response.data[nflGameId].away.score[3],
            forthQsAway: response.data[nflGameId].away.score[4],
            finalScoreAway: response.data[nflGameId].away.score.T
          }
          console.log(refreshObj);
          db.usergameinstances.update(refreshObj, {
            where: {
              userGameId: req.body.userGameId
            }
          }).then(function(dbRefresh) {
            res.json(dbRefresh)
          })
        })
  })

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
    

    var userGameObj = {
  
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

  var userGameInstanceObj = {
    userId: userId,
    nflGameId: nflGameId
  }

  console.log(userGameInstanceObj)
  

  //create usergames table entry and create usergameinstance table entry with the same id 
  db.usergames.create(userGameObj);
  db.usergameinstances.create(userGameInstanceObj);
})
  })

  app.post("/api/userinstances", function(req,res) {

    var instanceObj = {
      // userGameId: req.body.userGameId,
      // userId: req.body.userId,
      // nflGameId: req.body.nflGameId,
      A1: req.body.A1,
      A2: req.body.A2,
      A3: req.body.A3,
      A4: req.body.A4,
      A5: req.body.A5,
      A6: req.body.A6,
      A7: req.body.A7,
      A8: req.body.A8,
      A9: req.body.A9,
      A10: req.body.A10,
      B1: req.body.B1,
      B2: req.body.B2,
      B3: req.body.B3,
      B4: req.body.B4,
      B5: req.body.B5,
      B6: req.body.B6,
      B7: req.body.B7,
      B8: req.body.B8,
      B9: req.body.B9,
      B10: req.body.B10,
      C1: req.body.C1,
      C2: req.body.C2,
      C3: req.body.C3,
      C4: req.body.C4,
      C5: req.body.C5,
      C6: req.body.C6,
      C7: req.body.C7,
      C8: req.body.C8,
      C9: req.body.C9,
      C10: req.body.C10,
      D1: req.body.D1,
      D2: req.body.D2,
      D3: req.body.D3,
      D4: req.body.D4,
      D5: req.body.D5,
      D6: req.body.D6,
      D7: req.body.D7,
      D8: req.body.D8,
      D9: req.body.D9,
      D10: req.body.D10,
      E1: req.body.E1,
      E2: req.body.E2,
      E3: req.body.E3,
      E4: req.body.E4,
      E5: req.body.E5,
      E6: req.body.E6,
      E7: req.body.E7,
      E8: req.body.E8,
      E9: req.body.E9,
      E10: req.body.E10,
      F1: req.body.F1,
      F2: req.body.F2,
      F3: req.body.F3,
      F4: req.body.F4,
      F5: req.body.F5,
      F6: req.body.F6,
      F7: req.body.F7,
      F8: req.body.F8,
      F9: req.body.F9,
      F10: req.body.F10,
      G1: req.body.G1,
      G2: req.body.G2,
      G3: req.body.G3,
      G4: req.body.G4,
      G5: req.body.G5,
      G6: req.body.G6,
      G7: req.body.G7,
      G8: req.body.G8,
      G9: req.body.G9,
      G10: req.body.G10,
      H1: req.body.H1,
      H2: req.body.H2,
      H3: req.body.H3,
      H4: req.body.H4,
      H5: req.body.H5,
      H6: req.body.H6,
      H7: req.body.H7,
      H8: req.body.H8,
      H9: req.body.H9,
      H10: req.body.H10,
      I1: req.body.I1,
      I2: req.body.I2,
      I3: req.body.I3,
      I4: req.body.I4,
      I5: req.body.I5,
      I6: req.body.I6,
      I7: req.body.I7,
      I8: req.body.I8,
      I9: req.body.I9,
      I10: req.body.I10,
      J1: req.body.J1,
      J2: req.body.J2,
      J3: req.body.J3,
      J4: req.body.J4,
      J5: req.body.J5,
      J6: req.body.J6,
      J7: req.body.J7,
      J8: req.body.J8,
      J9: req.body.J9,
      J10: req.body.J10
    }
    console.log(instanceObj)
    db.usergameinstances.update(instanceObj, {
      where: {
        userGameId: req.body.userGameId
      }
    }).then(function(dbInstance) {
      res.json(dbInstance)
    })
  })
  
  
};