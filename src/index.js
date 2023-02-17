const { NUMBER, BelongsToMany, HasMany } = require("sequelize");
const { Board } = require("../src/models/Board");
const { sequelize } = require("../src/db/connection");
const { Cheese } = require("../src/models/Cheese");
const { User } = require("../src/models/User");

//one to may association
//1 user can have many boards
User.hasMany(Board);
Board.belongsTo(User); //but a board can only have (belong to)  1 user

//1 Board can have many cheeses
Board.belongsToMany(Cheese, { through: "cheese_board" });
Cheese.belongsToMany(Board, { through: "cheese_board" }); //1 cheese can be in many boards

module.exports = {
  Board,
  Cheese,
  User,
};
