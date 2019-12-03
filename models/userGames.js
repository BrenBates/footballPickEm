module.exports = function(sequelize, DataTypes) {
  var UserGames = sequelize.define("userGames", {
    userGameID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    createdByUserID: DataTypes.STRING,
    nflGameID: DataTypes.INTEGER
  });
  return UserGames;
};
