const { NUMBER, BelongsToMany } = require("sequelize");
const { Board } = require("../src/models/Board");
const { sequelize } = require("../src/db/connection");
const { Cheese } = require("../src/models/Cheese");
const { User } = require("../src/models/User");

module.exports = {
  Board,
  Cheese,
  User,
};
