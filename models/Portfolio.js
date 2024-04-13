const mongoose = require('mongoose');

// Define un esquema para las criptomonedas dentro del portfolio
const cryptoSchema = new mongoose.Schema({
  id: String,
  amount: Number,
  dailyPrice: Number,
  source: String,
});


// Define el esquema del portfolio
const portfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Asegúrate de que este refleje cómo has nombrado tu modelo de usuario
  },
  cryptos: [cryptoSchema] // Un array de objetos que siguen el esquema de criptomonedas
});

// Crea el modelo Portfolio basado en el esquema definido
const Portfolio = mongoose.model('Portfolio', portfolioSchema);

// Exporta el modelo
module.exports = Portfolio;

