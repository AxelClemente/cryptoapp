
const express = require('express');
const router = express.Router();
const { getPing, getSimplePrice, getCoinsMarkets } = require('../api/api'); // Asegúrate de que la ruta es correcta

// Definir rutas
router.get('/api/ping', async (req, res) => {
    try {
      const response = await getPing();
      res.json(response.data);
    } catch (error) {
      res.status(500).send(error.message);
    }
});

router.get('/api/prices', async (req, res) => {
    try {
      const ids = req.query.ids; // 'bitcoin,ethereum' como valor predeterminado, por ejemplo
      const vs_currencies = req.query.vs_currencies; // 'usd,eur' como valor predeterminado, por ejemplo
      const response = await getSimplePrice(ids, vs_currencies);
      res.json(response.data);
    } catch (error) {
      res.status(500).send(error.message);
    }
});

router.get('/api/markets', async (req, res) => {
    try {
      const vs_currency = req.query.vs_currency || 'usd'; // 'usd' como valor predeterminado
      const response = await getCoinsMarkets(vs_currency);
      res.json(response.data);
    } catch (error) {
      res.status(500).send(error.message);
    }
});

router.get('/', async (request, response, next) => {
    try {
      const marketData = await getCoinsMarkets('usd');
      console.log("Datos del mercado recibidos:", marketData.data); // Muestra los datos recibidos
  
      let htmlResponse = `<html><head><title>Crypto Market</title></head><body><table>`; // Inicia la respuesta HTML
  
      marketData.data.forEach((coin, index) => {
        console.log(`Procesando moneda: ${coin.name}`); // Muestra información de cada moneda
        // Aquí construyes la fila de la tabla con los datos de la moneda
        htmlResponse += `<tr>
                           <td>${index + 1}</td>
                           <td><img src="${coin.image}" alt="${coin.name}" style="width: 50px; height: auto;"></td>
                           <td>${coin.name}</td>
                           <td>${coin.symbol.toUpperCase()}</td>
                           <td>$${coin.current_price}</td>
                         </tr>`;
      });
  
      htmlResponse += `</table></body></html>`; // Cierra la respuesta HTML
      response.send(htmlResponse); // Envía la respuesta
    } catch (err) {
      console.error('Error de conexión al endpoint /coins/markets', err);
      response.send('<p>Error al recuperar los datos de las criptomonedas</p>');
    }
  });
  


module.exports = router;
