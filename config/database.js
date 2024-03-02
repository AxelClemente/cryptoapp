// const mongoose = require('mongoose');

//  mongoose
//   .connect('mongodb://localhost/Axel')
//   .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
//   .catch(err => console.error('Error connecting to mongo', err));

// config/database.js
// config/database.js
const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose
    .connect('mongodb://localhost/Axel')
    .then(() => console.log(`Connected to Mongo! Database name: "Axel"`))
    .catch(err => console.error('Error connecting to mongo', err));
};

module.exports = connectDatabase;

