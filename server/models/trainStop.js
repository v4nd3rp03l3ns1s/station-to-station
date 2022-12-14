'use strict';

module.exports = (sequelize, DataTypes) => {
  const TrainStop = sequelize.define('TrainStop', {
    _id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    stopID: {
      type: DataTypes.TEXT,
      unique: true
    },
    stopName: DataTypes.TEXT,
    direction: DataTypes.TEXT,
    // stationID: DataTypes.TEXT,
    red: DataTypes.BOOLEAN,
    blue: DataTypes.BOOLEAN,
    g: DataTypes.BOOLEAN,
    brn: DataTypes.BOOLEAN,
    p: DataTypes.BOOLEAN,
    y: DataTypes.BOOLEAN,
    pink: DataTypes.BOOLEAN,
    org: DataTypes.BOOLEAN
  });

  TrainStop.associate = db => {
    db.TrainStop.belongsTo(db.TrainStation, {
      onDelete: "CASCADE",
      foreignKey: {
        name: 'stationID',
        type: DataTypes.TEXT
      },
      targetKey: 'stationID'
    });
    db.TrainStop.hasMany(db.UserTrain, {
      onDelete: "CASCADE",
      foreignKey: 'stopID',
      sourceKey: 'stopID'
    });
  };

  return TrainStop;
};