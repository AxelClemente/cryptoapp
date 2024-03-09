// Conexion local
// const mongoose = require('mongoose');

// const connectDatabase = () => {
//   mongoose
//     .connect('mongodb://localhost/Axel')
//     .then(() => console.log(`Connected to Mongo! Database name: "Axel"`))
//     .catch(err => console.error('Error connecting to mongo', err));
// };

// module.exports = connectDatabase;

//Conexion en la nube
const mongoose = require('mongoose');

const connectDatabase = () => {
  const uri = process.env.URI; // Asumiendo que 'URI' contiene la cadena de conexión completa

  mongoose
    .connect(uri)
    .then((x) => {
      const name = x.connections[0].name;
      console.log(`Connected to Mongo! Database name: "${name}"`);
    }) 
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));
};

module.exports = connectDatabase;

