module.exports = function(sequelize, DataTypes) {
  var Usergames = sequelize.define("usergames", {
    userGameId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER
    },
    nflGameId: {
      type: DataTypes.INTEGER
    },
    week: {
      type: DataTypes.INTEGER
    },
    homeTeam: {
      type: DataTypes.STRING
    },
    awayTeam: {
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
    a: {
      type: DataTypes.INTEGER
    },
    b: {
      type: DataTypes.INTEGER
    },
    c: {
      type: DataTypes.INTEGER
    },
    d: {
      type: DataTypes.INTEGER
    },
    e: {
      type: DataTypes.INTEGER
    },
    f: {
      type: DataTypes.INTEGER
    },
    g: {
      type: DataTypes.INTEGER
    },
    h: {
      type: DataTypes.INTEGER
    },
    i: {
      type: DataTypes.INTEGER
    },
    j: {
      type: DataTypes.INTEGER
    },
    one: {
      type: DataTypes.INTEGER
    },
    two: {
      type: DataTypes.INTEGER
    },
    three: {
      type: DataTypes.INTEGER
    },
    four: {
      type: DataTypes.INTEGER
    },
    five: {
      type: DataTypes.INTEGER
    },
    six: {
      type: DataTypes.INTEGER
    },
    seven: {
      type: DataTypes.INTEGER
    },
    eight: {
      type: DataTypes.INTEGER
    },
    nine: {
      type: DataTypes.INTEGER
    },
    ten: {
      type: DataTypes.INTEGER
    }
  });
  return Usergames;
};
