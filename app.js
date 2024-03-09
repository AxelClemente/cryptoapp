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
// app.use(cors());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3001', process.env.ORIGIN] // Aquí se agregan los orígenes permitidos
  }));
  
app.use(express.static('public'));

// Rutas de autenticación
app.use("/auth", authRoutes);
app.use("/portfolio", portfolioRoutes)
app.use('/api', holdingsRoutes); // Asegúrate de que 'api' esté en la ruta


module.exports = app;