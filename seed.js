require('dotenv').config();
const mongoose = require('mongoose');
const connectDatabase = require('./config/database'); // Asegúrate de que la ruta sea correcta
const Crypto = require('./models/Crypto.model'); // Asegúrate de que la ruta al modelo es correcta

// Datos de las criptomonedas
const cryptoCurrencies = [
    { id: "ethereum", symbol: "eth", name: "Ethereum", image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628', category:'layer1' },
    { id: "tether", symbol: "usdt", name: "Tether", image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661', category:'stable coin' }
];

// Función asíncrona para hacer el seeding
const seedCryptos = async () => {
  await connectDatabase(); // Espera a que la conexión se establezca
  try {
    const createdCryptos = await Crypto.create(cryptoCurrencies);
    console.log(`Created ${createdCryptos.length} cryptocurrencies`);
  } catch (err) {
    console.error(`An error occurred while creating cryptocurrencies in the DB: ${err}`);
  } finally {
    mongoose.connection.close();
  }
};

seedCryptos();
