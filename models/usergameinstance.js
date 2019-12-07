module.exports = function(sequelize, DataTypes) {
  var Usergameinstances = sequelize.define("usergameinstances", {
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
    A1: {
      type: DataTypes.TEXT,
      defaultValue: "A1"
    },
    A2: {
      type: DataTypes.TEXT,
      defaultValue: "A2"
    },
    A3: {
      type: DataTypes.TEXT,
      defaultValue: "A3"
    },
    A4: {
      type: DataTypes.TEXT,
      defaultValue: "A4"
    },
    A5: {
      type: DataTypes.TEXT,
      defaultValue: "A5"
    },
    A6: {
      type: DataTypes.TEXT,
      defaultValue: "A6"
    },
    A7: {
      type: DataTypes.TEXT,
      defaultValue: "A7"
    },
    A8: {
      type: DataTypes.TEXT,
      defaultValue: "A8"
    },
    A9: {
      type: DataTypes.TEXT,
      defaultValue: "A9"
    },
    A10: {
      type: DataTypes.TEXT,
      defaultValue: "A10"
    },
    B1: {
      type: DataTypes.TEXT,
      defaultValue: "B1"
    },
    B2: {
      type: DataTypes.TEXT,
      defaultValue: "B2"
    },
    B3: {
      type: DataTypes.TEXT,
      defaultValue: "B3"
    },
    B4: {
      type: DataTypes.TEXT,
      defaultValue: "B4"
    },
    B5: {
      type: DataTypes.TEXT,
      defaultValue: "B5"
    },
    B6: {
      type: DataTypes.TEXT,
      defaultValue: "B6"
    },
    B7: {
      type: DataTypes.TEXT,
      defaultValue: "B7"
    },
    B8: {
      type: DataTypes.TEXT,
      defaultValue: "B8"
    },
    B9: {
      type: DataTypes.TEXT,
      defaultValue: "B9"
    },
    B10: {
      type: DataTypes.TEXT,
      defaultValue: "B10"
    },
    C1: {
      type: DataTypes.TEXT,
      defaultValue: "C1"
    },
    C2: {
      type: DataTypes.TEXT,
      defaultValue: "C2"
    },
    C3: {
      type: DataTypes.TEXT,
      defaultValue: "C3"
    },
    C4: {
      type: DataTypes.TEXT,
      defaultValue: "C4"
    },
    C5: {
      type: DataTypes.TEXT,
      defaultValue: "C5"
    },
    C6: {
      type: DataTypes.TEXT,
      defaultValue: "C6"
    },
    C7: {
      type: DataTypes.TEXT,
      defaultValue: "C7"
    },
    C8: {
      type: DataTypes.TEXT,
      defaultValue: "C8"
    },
    C9: {
      type: DataTypes.TEXT,
      defaultValue: "C9"
    },
    C10: {
      type: DataTypes.TEXT,
      defaultValue: "C10"
    },
    D1: {
      type: DataTypes.TEXT,
      defaultValue: "D1"
    },
    D2: {
      type: DataTypes.TEXT,
      defaultValue: "D2"
    },
    D3: {
      type: DataTypes.TEXT,
      defaultValue: "D3"
    },
    D4: {
      type: DataTypes.TEXT,
      defaultValue: "D4"
    },
    D5: {
      type: DataTypes.TEXT,
      defaultValue: "D5"
    },
    D6: {
      type: DataTypes.TEXT,
      defaultValue: "D6"
    },
    D7: {
      type: DataTypes.TEXT,
      defaultValue: "D7"
    },
    D8: {
      type: DataTypes.TEXT,
      defaultValue: "D8"
    },
    D9: {
      type: DataTypes.TEXT,
      defaultValue: "D9"
    },
    D10: {
      type: DataTypes.TEXT,
      defaultValue: "D10"
    },
    E1: {
      type: DataTypes.TEXT,
      defaultValue: "E1"
    },
    E2: {
      type: DataTypes.TEXT,
      defaultValue: "E2"
    },
    E3: {
      type: DataTypes.TEXT,
      defaultValue: "E3"
    },
    E4: {
      type: DataTypes.TEXT,
      defaultValue: "E4"
    },
    E5: {
      type: DataTypes.TEXT,
      defaultValue: "E5"
    },
    E6: {
      type: DataTypes.TEXT,
      defaultValue: "E6"
    },
    E7: {
      type: DataTypes.TEXT,
      defaultValue: "E7"
    },
    E8: {
      type: DataTypes.TEXT,
      defaultValue: "E8"
    },
    E9: {
      type: DataTypes.TEXT,
      defaultValue: "E9"
    },
    E10: {
      type: DataTypes.TEXT,
      defaultValue: "E10"
    },
    F1: {
      type: DataTypes.TEXT,
      defaultValue: "F1"
    },
    F2: {
      type: DataTypes.TEXT,
      defaultValue: "F2"
    },
    F3: {
      type: DataTypes.TEXT,
      defaultValue: "F3"
    },
    F4: {
      type: DataTypes.TEXT,
      defaultValue: "F4"
    },
    F5: {
      type: DataTypes.TEXT,
      defaultValue: "F5"
    },
    F6: {
      type: DataTypes.TEXT,
      defaultValue: "F6"
    },
    F7: {
      type: DataTypes.TEXT,
      defaultValue: "F7"
    },
    F8: {
      type: DataTypes.TEXT,
      defaultValue: "F8"
    },
    F9: {
      type: DataTypes.TEXT,
      defaultValue: "F9"
    },
    F10: {
      type: DataTypes.TEXT,
      defaultValue: "F10"
    },
    G1: {
      type: DataTypes.TEXT,
      defaultValue: "G1"
    },
    G2: {
      type: DataTypes.TEXT,
      defaultValue: "G2"
    },
    G3: {
      type: DataTypes.TEXT,
      defaultValue: "G3"
    },
    G4: {
      type: DataTypes.TEXT,
      defaultValue: "G4"
    },
    G5: {
      type: DataTypes.TEXT,
      defaultValue: "G5"
    },
    G6: {
      type: DataTypes.TEXT,
      defaultValue: "G6"
    },
    G7: {
      type: DataTypes.TEXT,
      defaultValue: "G7"
    },
    G8: {
      type: DataTypes.TEXT,
      defaultValue: "G8"
    },
    G9: {
      type: DataTypes.TEXT,
      defaultValue: "G9"
    },
    G10: {
      type: DataTypes.TEXT,
      defaultValue: "G10"
    },
    H1: {
      type: DataTypes.TEXT,
      defaultValue: "H1"
    },
    H2: {
      type: DataTypes.TEXT,
      defaultValue: "H2"
    },
    H3: {
      type: DataTypes.TEXT,
      defaultValue: "H3"
    },
    H4: {
      type: DataTypes.TEXT,
      defaultValue: "H4"
    },
    H5: {
      type: DataTypes.TEXT,
      defaultValue: "H5"
    },
    H6: {
      type: DataTypes.TEXT,
      defaultValue: "H6"
    },
    H7: {
      type: DataTypes.TEXT,
      defaultValue: "H7"
    },
    H8: {
      type: DataTypes.TEXT,
      defaultValue: "H8"
    },
    H9: {
      type: DataTypes.TEXT,
      defaultValue: "H9"
    },
    H10: {
      type: DataTypes.TEXT,
      defaultValue: "H10"
    },
    I1: {
      type: DataTypes.TEXT,
      defaultValue: "I1"
    },
    I2: {
      type: DataTypes.TEXT,
      defaultValue: "I2"
    },
    I3: {
      type: DataTypes.TEXT,
      defaultValue: "I3"
    },
    I4: {
      type: DataTypes.TEXT,
      defaultValue: "I4"
    },
    I5: {
      type: DataTypes.TEXT,
      defaultValue: "I5"
    },
    I6: {
      type: DataTypes.TEXT,
      defaultValue: "I6"
    },
    I7: {
      type: DataTypes.TEXT,
      defaultValue: "I7"
    },
    I8: {
      type: DataTypes.TEXT,
      defaultValue: "I8"
    },
    I9: {
      type: DataTypes.TEXT,
      defaultValue: "I9"
    },
    I10: {
      type: DataTypes.TEXT,
      defaultValue: "I10"
    },
    J1: {
      type: DataTypes.TEXT,
      defaultValue: "J1"
    },
    J2: {
      type: DataTypes.TEXT,
      defaultValue: "J2"
    },
    J3: {
      type: DataTypes.TEXT,
      defaultValue: "J3"
    },
    J4: {
      type: DataTypes.TEXT,
      defaultValue: "J4"
    },
    J5: {
      type: DataTypes.TEXT,
      defaultValue: "J5"
    },
    J6: {
      type: DataTypes.TEXT,
      defaultValue: "J6"
    },
    J7: {
      type: DataTypes.TEXT,
      defaultValue: "J7"
    },
    J8: {
      type: DataTypes.TEXT,
      defaultValue: "J8"
    },
    J9: {
      type: DataTypes.TEXT,
      defaultValue: "J9"
    },
    J10: {
      type: DataTypes.TEXT,
      defaultValue: "J10"
    }
  });
  return Usergameinstances;
};
