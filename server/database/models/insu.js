"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Insu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Insu.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      dob: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
      },
      maritalStatus: {
        type: DataTypes.STRING,
      },
      catId: {
        type: DataTypes.STRING,
      },
      expiryDate: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Insu",
      tableName: "insus",
    }
  );
  return Insu;
};
