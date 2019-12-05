module.exports = function(sequelize, DataTypes) {
  var Games = sequelize.define("games", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    gameId: {
      type: DataTypes.INTEGER
    },
    week: {
      type: DataTypes.INTEGER
    },
    homeTeam: {
      type: DataTypes.STRING
    },
    firstQsHome: {
      type: DataTypes.INTEGER
    },
    secondQsHome: {
      type: DataTypes.INTEGER
    },
    thirdQsHome: {
      type: DataTypes.INTEGER
    },
    forthQsHome: {
      type: DataTypes.INTEGER
    },
    finalScoreHome: {
      type: DataTypes.INTEGER
    },
    awayTeam: {
      type: DataTypes.STRING
    },
    firstQsAway: {
      type: DataTypes.INTEGER
    },
    secondQsAway: {
      type: DataTypes.INTEGER
    },
    thirdQsAway: {
      type: DataTypes.INTEGER
    },
    forthQsAway: {
      type: DataTypes.INTEGER
    },
    finalScoreAway: {
      type: DataTypes.INTEGER
    },
    gameStatus: {
      type: DataTypes.STRING
    },
    gameClock: {
      type: DataTypes.STRING
    }
  });
  return Games;
};
