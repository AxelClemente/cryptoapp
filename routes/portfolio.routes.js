const express = require('express');
const router = express.Router();
const axios = require('axios'); // Asegúrate de tener axios instalado
const Portfolio = require('../models/Portfolio');
const authenticateToken = require('../middlewares/authenticateToken');

// Añade una nueva ruta para obtener los datos de mercado
router.get('/markets', authenticateToken, async (req, res) => {
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
router.post('/add',  async (req, res) => {
  const { userId, cryptoId, amount } = req.body;
  console.log('Solicitud recibida en /portfolio/add', req.body);


  // La lógica para agregar a la cartera permanece igual
  try {
    let portfolio = await Portfolio.findOne({ userId: userId });
    if (!portfolio) {
      portfolio = new Portfolio({
        userId,
        cryptos: [{ id: cryptoId, amount: amount }],
      });
    } else {
      portfolio.cryptos.push({ id: cryptoId, amount: amount });
    }
    const updatedPortfolio = await portfolio.save();
    res.status(200).json(updatedPortfolio);
  } catch (error) {
    console.error('Error in /portfolio/add:', error);
    res.status(500).json({ message: "Error adding crypto to portfolio", error: error.toString() });
  }
});

module.exports = router;
