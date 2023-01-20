const { connect, connection} = require('mongoose');
const connctionString = 
    process.env.MONGDB_URI || `mongodb://127.0.0.1:27017/networkDB`;

connect(connctionString, {
    userNewUrlParser: true,
    userUnifiedTopology: true,
});

module.exports = connection;