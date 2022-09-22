'use strict';

module.exports = (sequelize, DataTypes) => {
  const BusRoute = sequelize.define('BusRoute', {
    _id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    routeID: DataTypes.TEXT,
    routeName: DataTypes.TEXT,
    routeColor: DataTypes.TEXT
  });

  BusRoute.associate = db => {
    db.BusRoute.hasMany(db.BusDirection, {
      onDelete: "CASCADE",
      foreignKey: { allowNull: false }
    });
    db.BusRoute.hasMany(db.UserBus, {
      onDelete: "CASCADE",
      foreignKey: { allowNull: false }
    });
  };

  return BusRoute;
};