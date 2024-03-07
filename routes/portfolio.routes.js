const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const authenticateToken = require('../middlewares/authenticateToken');
const jwt = require('jsonwebtoken');


// router.post('/add', authenticateToken, async (req, res) => {
//   const { userId, cryptoId, amount } = req.body;
  
//   try {
//     // Asumiendo que ya tienes un documento de portafolio creado para este usuario,
//     // de lo contrario, necesitarías crear uno.
//     let portfolio = await Portfolio.findOne({ userId: userId });

//     if (!portfolio) {
//       // Si no existe, crear un nuevo documento de portafolio
//       portfolio = new Portfolio({
//         userId,
//         cryptos: [{ id: cryptoId, amount: amount }],
//       });
//     } else {
//       // Si ya existe, simplemente agrega la nueva criptomoneda
//       portfolio.cryptos.push({ id: cryptoId, amount: amount });
//     }

//     const updatedPortfolio = await portfolio.save();
//     res.status(200).json(updatedPortfolio);
//   } catch (error) {
//     res.status(500).json({ message: "Error adding crypto to portfolio", error: error.message });
//   }
// });

router.post('/add', authenticateToken, async (req, res) => {
  const { userId, cryptoId, amount } = req.body;
  
  console.log('Request to add to portfolio:', { userId, cryptoId, amount });

  try {
    let portfolio = await Portfolio.findOne({ userId: userId });
    console.log('Portfolio found:', portfolio);

    if (!portfolio) {
      console.log('Creating new portfolio');
      portfolio = new Portfolio({
        userId,
        cryptos: [{ id: cryptoId, amount: amount }],
      });
    } else {
      console.log('Adding crypto to existing portfolio');
      portfolio.cryptos.push({ id: cryptoId, amount: amount });
    }

    const updatedPortfolio = await portfolio.save();
    console.log('Portfolio updated:', updatedPortfolio);
    res.status(200).json(updatedPortfolio);
  } catch (error) {
    console.error('Error in /portfolio/add:', error);
    res.status(500).json({ message: "Error adding crypto to portfolio", error: error.toString() });
  }
});


module.exports = router;
