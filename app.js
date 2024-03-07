require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const connectDatabase = require('./config/database');
const authRoutes = require('./routes/auth.routes')
const portfolioRoutes = require('./routes/portfolio.routes')
const holdingsRoutes = require('./routes/holdings.routes');

const app = express();
const routes = require('./routes/routes');




// Conectar a la base de datos
connectDatabase();

// Usar las rutas definidas
app.use(routes);
app.use(express.json()); // Middleware para parsear JSON
app.use(cors());
app.use(express.static('public'));

// Rutas de autenticación
app.use("/auth", authRoutes);
app.use("/portfolio", portfolioRoutes)
app.use('/api', holdingsRoutes); // Asegúrate de que 'api' esté en la ruta





///////////////////////////////////////////////////// test
// Definir un modelo simple
// const TestModel = mongoose.model('Test', new mongoose.Schema({ name: String }));

// Crear un documento de prueba
// TestModel.create({ name: 'Test Entry' })
//   .then(doc => {
//     console.log('Documento creado:', doc);
//     // Leer el documento
//     return TestModel.findOne({ name: 'Test Entry' });
//   })
//   .then(doc => {
//     console.log('Documento encontrado:', doc);
//     // Actualizar el documento
//     return TestModel.updateOne({ name: 'Test Entry' }, { name: 'Updated Entry' });
//   })
//   .then(result => {
//     console.log('Documento actualizado:', result);
//     // Eliminar el documento
//     return TestModel.deleteOne({ name: 'Updated Entry' });
//   })
// //   .then(result => {
// //     console.log('Documento eliminado:', result);
// //     // Cerrar la conexión de la base de datos
// //     mongoose.connection.close();
// //   })
//   .catch(err => {
//     console.error('Error durante las operaciones CRUD:', err);
//     mongoose.connection.close();
//   });
///////////////////////////////////////////////////// fin test



module.exports = app;