
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("user", {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      firstName: {
          type: DataTypes.STRING
      },
      lastName: {
          type: DataTypes.STRING
      },
      email: {
          type: DataTypes.STRING
      },
      password: {
          type: DataTypes.STRING
      }
    //   created: {
    //       type: DataTypes.DATE,
    //       defaultValue: DataTypes.NOW
    //   }
    },
    {
        timestamps: false
    }
    );
    return User;
  };
