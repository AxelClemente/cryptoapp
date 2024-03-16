// TEST!
const express = require('express');
const router = express.Router();
const axios = require('axios'); // Asegúrate de tener axios instalado
const Portfolio = require('../models/Portfolio');
// const authenticateToken = require('../middlewares/authenticateToken');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Añade una nueva ruta para obtener los datos de mercado
router.get('/markets',  async (req, res) => {
  console.log("Autenticación exitosa, procediendo a buscar datos de mercado");

  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 150,
        page: 1
      }
    });

    console.log("Datos de mercado obtenidos exitosamente");
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from CoinGecko:', error);
    res.status(500).json({ message: "Error fetching market data", error: error.toString() });
  }
});


// Modifica la ruta existente para ajustarse al nuevo flujo
router.post('/add', async (req, res) => {
  const { token, cryptoId, amount } = req.body; // Asume que el cliente envía el token
  console.log('Solicitud recibida en /portfolio/add', req.body);

  try {
      // Verifica el token con Google
      console.log('Verificando token con Google...');
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const userId = payload['sub']; // 'sub' es el ID de usuario de Google
      console.log('Token verificado. ID de Usuario de Google:', userId);

      console.log('Buscando o creando la cartera para el usuario con ID:', userId);
      // Aquí continuas con tu lógica para agregar a la cartera, usando `userId`
      let portfolio = await Portfolio.findOne({ userId: userId });
      if (!portfolio) {
          portfolio = new Portfolio({
              userId,
              cryptos: [{ cryptoId, amount }],
          });
      } else {
        console.log('Cartera encontrada, agregando la criptomoneda...');
          portfolio.cryptos.push({ cryptoId, amount });
      }
      const updatedPortfolio = await portfolio.save();
      res.status(200).json(updatedPortfolio);
  } catch (error) {
      console.error('Error in /portfolio/add:', error);
      res.status(500).json({ message: "Error adding crypto to portfolio", error: error.toString() });
  }
});

module.exports = router;
