module.exports = function(sequelize, DataTypes) {
  var UserGames = sequelize.define("userGame", {
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

UserGames.associate = function(models) {
  // associating UserGames with Players
  UserGames.hasMany(models.Player, {
    onDelete: "cascade"
  });
};
