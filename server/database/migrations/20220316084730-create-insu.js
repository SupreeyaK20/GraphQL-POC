"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("insus", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      phone: {
        type: Sequelize.STRING(12),
        allowNull: false,
        unique: true,
      },
      dob: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING(20),
      },
      maritalStatus: {
        type: Sequelize.STRING(20),
      },
      catId: {
        type: Sequelize.STRING,
      },
      expiryDate: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("insus");
  },
};
