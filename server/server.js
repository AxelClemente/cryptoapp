const app = require('../app');
const mongoose = require('mongoose'); // Asegúrate de importar mongoose
const PORT = process.env.PORT || 3000;

// Función para conectar a la base de datos
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Usa la variable de entorno MONGO_URI para tu cadena de conexión
    console.log('MongoDB Connected');

    // Iniciar el servidor después de establecer la conexión con la base de datos
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Sale del proceso si no puede conectarse a MongoDB
  }
};

// Inicia el proceso de conexión a la base de datos
connectDB();
