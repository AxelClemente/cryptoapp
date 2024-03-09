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
// const mongoose = require('mongoose');

// const connectDatabase = () => {
//   const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_URL}/?retryWrites=true&w=majority&appName=Cluster0`;

//   mongoose
//     .connect(uri)
//     .then(() => console.log('Connected to MongoDB Atlas working'))
//     .catch(err => console.error('Error connecting to MongoDB Atlas:', err));
// };

// module.exports = connectDatabase;

const mongoose = require('mongoose');

const connectDatabase = async () => {
  const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_URL}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas working');
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas:', err);
    process.exit(1); // Salimos de la aplicación si no hay conexión a la base de datos
  }
};

module.exports = connectDatabase;

