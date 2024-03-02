const axios = require('axios');

require('dotenv').config();

const api = axios.create({
  baseURL : 'https://api.coingecko.com/api/v3'
});

const key = process.env.COINGECKO_API_KEY;

function getPing() {
  return api.get(`ping?x_cg_demo_api_key=${key}`);
}

function getSimplePrice(ids, vs_currencies) {
  return api.get(`/simple/price?ids=${ids}&vs_currencies=${vs_currencies}`);
}

function getCoinsMarkets(vs_currency) {
  return api.get(`/coins/markets?vs_currency=${vs_currency}&order=market_cap_desc&per_page=20&page=1`);
}

// Exporta las funciones para que puedan ser utilizadas en otros archivos
module.exports = {
  getPing,
  getSimplePrice,
  getCoinsMarkets
};
