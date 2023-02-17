const { DataTypes } = require("sequelize");
const { Sequelize, sequelize } = require("../db/connection");

//Define the Cheese model
let Cheese = sequelize.define("Cheese", {
  title: DataTypes.STRING,
  description: DataTypes.STRING,
});

module.exports = {
  Cheese,
};
