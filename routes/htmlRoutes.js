var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/viewgames", function(req, res) {

    res.render("viewgames");
  });

  app.get("/viewteams", function(req, res) {
    res.render("viewteams");

  });

   // Get specific user game instance

   app.get("/usergames/:usergameid", function(req,res) {
    let userGameId = req.params.usergameid
    console.log("=======================================================================")
    console.log("this is the user game id: ")
    console.log(userGameId);
    db.usergames.findOne({
      where: {
        userGameId: req.params.usergameid
      }
    }).then(function(dbUserGame) {

      db.usergameinstances.findOne({
        where: {
          userGameId: req.params.usergameid
        }
      }).then(function(dbUserGameInstance) {

      var hbsObject = {
        ug: dbUserGame,
        ugi: dbUserGameInstance
      }
      res.render("usergame",hbsObject);

    })
    })

  })

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};