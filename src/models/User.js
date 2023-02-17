const { DataTypes } = require("sequelize");
const { Sequelize, sequelize } = require("../db/connection");

//Define the User model
let User = sequelize.define("User", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
});

module.exports = {
  User,
};
