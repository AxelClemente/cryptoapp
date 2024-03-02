require('dotenv').config();
const express = require('express');
const axios = require('axios');
const User = require('./models/User');
const connectDatabase = require('./config/database');
const app = express();
const routes = require('./routes/routes');
const { getPing, getSimplePrice, getCoinsMarkets } = require('./api/api'); 
app.use(express.static('public'));

// Conectar a la base de datos
connectDatabase();

// Usar las rutas definidas
app.use(routes);



module.exports = app;