module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define("player", {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userGameID: DataTypes.STRING,
    nflGameID: DataTypes.INTEGER
  });

  Player.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    PLayer.belongsTo(models.UserGame, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Post;
};
