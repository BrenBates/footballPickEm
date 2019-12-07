app.put("/api/updategame", function(req, res) {

    let nflGameId = req.body.nflGameId;
    let queryUrl = "http://www.nfl.com/liveupdate/game-center/" + nflGameId + "/" + nflGameId + "_gtd.json";
    axios
      .get(queryUrl)
      .then(function(response) {
        console.log(response);
            var tempObj = {
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
          }
          console.log(tempObj);
    db.usergames.update(tempObj).then(function(dbUserGames) {
      res.json(dbUserGames);
    })
  });
