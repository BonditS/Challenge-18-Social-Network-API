//export and import express route outside model folder

const User = require("./User");
const Thought = require("./thoughts")

module.exports = { User, Thought}