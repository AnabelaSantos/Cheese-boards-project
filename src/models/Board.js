const { DataTypes } = require("sequelize");
const { Sequelize, sequelize } = require("../db/connection");

//Define the Board model
let Board = sequelize.define("Board", {
  type: DataTypes.STRING,
  description: DataTypes.STRING,
  rating: DataTypes.NUMBER,
});

module.exports = {
  Board,
};
