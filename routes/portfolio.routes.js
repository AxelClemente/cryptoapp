// TEST!
const express = require('express');
const router = express.Router();
const axios = require('axios'); // Asegúrate de tener axios instalado
const Portfolio = require('../models/Portfolio');
// const authenticateToken = require('../middlewares/authenticateToken');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Añade una nueva ruta para obtener los datos de mercadooo
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

    console.log("Datos de mercado obtenidos exitosamente", response.data);
    res.json(response.data);
   
  } catch (error) {
    console.error('Error fetching data from CoinGecko:', error);
    res.status(500).json({ message: "Error fetching market data", error: error.toString() });
  }
});


router.post('/add', async (req, res) => {
  // Asume que se envían 'dailyPrice' y 'source' en el cuerpo de la solicitud
  const { userId, cryptoId, amount, dailyPrice, source } = req.body;
  console.log('Solicitud recibida en /portfolio/add', req.body);
  // Verificación básica de los datos de entrada
  if (!dailyPrice || !source) {
    console.log('Faltan dailyPrice o source');
    return res.status(400).json({ message: "Error: 'dailyPrice' y 'source' son campos requeridos." });
  }

  try {
    // Buscando o creando la cartera para el usuario con el ID proporcionado
    let portfolio = await Portfolio.findOne({ userId: userId });
    if (!portfolio) {
      portfolio = new Portfolio({
        userId,
        cryptos: [{
          id: cryptoId, // Asegúrate de que este campo corresponda al 'id' de la cripto
          amount: Number(amount), // Convierte a número
          dailyPrice, // Asegúrate de que estos nombres de campo coincidan con tu esquema
          source
        }]
      });
    } else {
      portfolio.cryptos.push({
        id: cryptoId,
        amount: Number(amount),
        dailyPrice,
        source
      });
    }

    // Guardando la cartera actualizada en la base de datos
    // console.log('Portfolio a guardar joder:', portfolio);
    const updatedPortfolio = await portfolio.save();
    // console.log('Después de guardar:', updatedPortfolio);
    res.status(200).json(updatedPortfolio);
  } catch (error) {
    console.error('Error en /portfolio/add:', error);
    res.status(500).json({ message: "Error agregando cripto a la cartera", error: error.toString() });
  }
});

router.delete('/sell', async (req, res) => {
  const { userId, cryptoId, amount } = req.body;  // 'amount' es la cantidad de cripto que el usuario desea vender

  if (!userId || !cryptoId || amount === undefined) {
    return res.status(400).json({ message: "Error: Todos los campos (userId, cryptoId, amount) son requeridos." });
  }

  try {
    let portfolio = await Portfolio.findOne({ userId: userId });
    if (!portfolio) {
      return res.status(404).json({ message: "Cartera no encontrada." });
    }

    const cryptoIndex = portfolio.cryptos.findIndex(c => c.id === cryptoId);
    if (cryptoIndex === -1) {
      return res.status(404).json({ message: "Criptomoneda no encontrada en la cartera." });
    }

    // Verificar si la cantidad a vender es menor o igual a la cantidad en cartera
    if (portfolio.cryptos[cryptoIndex].amount < amount) {
      return res.status(400).json({ message: "No hay suficientes unidades de la criptomoneda para vender." });
    }

    // Actualizar la cantidad o eliminar la cripto si la cantidad a vender es igual a la en cartera
    if (portfolio.cryptos[cryptoIndex].amount === amount) {
      portfolio.cryptos.splice(cryptoIndex, 1);  // Elimina la cripto del array
    } else {
      portfolio.cryptos[cryptoIndex].amount -= amount;  // Reduce la cantidad existente
    }

    const updatedPortfolio = await portfolio.save();
    res.status(200).json({ message: "Venta realizada exitosamente.", updatedPortfolio });
  } catch (error) {
    console.error('Error al vender la criptomoneda:', error);
    res.status(500).json({ message: "Error interno al vender la criptomoneda", error: error.toString() });
  }
});


module.exports = router;
