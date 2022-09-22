'use strict';

module.exports = (sequelize, DataTypes) => {
  const BusStop = sequelize.define('BusStop', {
    _id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    stopID: DataTypes.TEXT,
    stopName: DataTypes.TEXT
  });

  BusStop.associate = db => {
    db.BusStop.belongsTo(db.BusDirection, {
      onDelete: "CASCADE",
      foreignKey: { allowNull: false }
    });
    db.BusStop.hasMany(db.UserBus, {
      onDelete: "CASCADE",
      foreignKey: { allowNull: false }
    });
  };

  return BusStop;
};