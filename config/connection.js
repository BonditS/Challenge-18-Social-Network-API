const { connect, connection} = require('mongoose');

connect('mongodb://localhost/socialNetworkDB', {
    userNewUrlParser: true,
    userUnifiedTopology: true,
});

module.exports = connection;