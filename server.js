const express = require("express");
const db = require('./config/connection');
const routes = require("./routes")

const app = express();
const PORT = process.env.PORT || 3001;

//middleware function 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//once the mongoose connection is made with db call, render the event once.
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server is running on port ${PORT}!`);
  });
});