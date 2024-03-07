require('dotenv').config();
const express = require('express');
const axios = require('axios');
const User = require('./models/User');
const cors = require('cors');
const connectDatabase = require('./config/database');
const app = express();
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const { getPing, getSimplePrice, getCoinsMarkets } = require('./api/api'); 
app.use(express.static('public'));
const authRoutes = require('./routes/auth.routes')
const portfolioRoutes = require('./routes/portfolio.routes')
const authenticateToken = require('./middlewares/authenticateToken');

// Conectar a la base de datos
connectDatabase();

// Usar las rutas definidas
app.use(routes);
app.use(express.json()); // Middleware para parsear JSON
app.use(cors());

// Rutas de autenticación
app.use("/auth", authRoutes);
app.use("/portfolio", portfolioRoutes)




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