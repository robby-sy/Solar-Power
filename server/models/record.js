"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Record.init(
    {
      ProjectId: DataTypes.INTEGER,
      voltage: DataTypes.FLOAT,
      current: DataTypes.FLOAT,
      power: DataTypes.FLOAT,
      temperature: DataTypes.FLOAT,
      humidity: DataTypes.FLOAT,
      intensity: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Record",
    }
  );
  return Record;
};
