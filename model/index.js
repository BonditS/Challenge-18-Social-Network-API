//export and import express route outside model folder

const User = require("./User");
const Thought = require("./thougths")

module.exports = { User, Thought}