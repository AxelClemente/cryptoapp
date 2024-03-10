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

const connectDatabase = async () => {
  const uri = process.env.URI; // Ensure that 'URI' contains the complete connection string

  try {
    const conn = await mongoose.connect(uri);

    console.log(`Connected to Mongo! Database name: "${conn.connection.name}"`);
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas:', err);
    process.exit(1);
  }
};

module.exports = connectDatabase;



