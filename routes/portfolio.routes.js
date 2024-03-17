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
  const { userId, cryptoId, amount } = req.body; // Directamente usamos userId enviado por el cliente
  console.log('Solicitud recibida en /portfolio/add', req.body);

  try {
    console.log('Procediendo sin verificación de token de Google...');
    console.log('Usando ID de usuario directamente:', userId);

    // Buscando o creando la cartera para el usuario con el ID proporcionado
    let portfolio = await Portfolio.findOne({ userId: userId });
    if (!portfolio) {
      portfolio = new Portfolio({
          userId,
          cryptos: [{ id: cryptoId, amount }], // Asegúrate de usar id aquí también
        });
    } else {
      console.log('Cartera encontrada, agregando la criptomoneda...');
        portfolio.cryptos.push({ id: cryptoId, amount });
    }
    const updatedPortfolio = await portfolio.save();
    res.status(200).json(updatedPortfolio);
  } catch (error) {
    console.error('Error en /portfolio/add:', error);
    res.status(500).json({ message: "Error agregando cripto a la cartera", error: error.toString() });
  }
});


module.exports = router;
