// ... Otras importaciones
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');


// En el archivo holdings.routes.js

const Portfolio = require('../models/Portfolio'); // Asegúrate de importar el modelo correctamente

// Manejador de ruta para obtener el portafolio
router.get('/holdings', authenticateToken, (req, res) => { // Asegúrate de usar el middleware authenticateToken para tener acceso a req.user
  Portfolio.findOne({ userId: req.user.id }) // Encuentra el portafolio basado en el userId obtenido del token JWT
    .then(portfolio => {
      if (!portfolio) {
        return res.status(404).json({ message: "Portfolio not found" });
      }
      console.log("Portfolio encontrado:", portfolio); // Aquí agregas el console.log
      res.json(portfolio);
    })
    .catch(error => res.status(500).json({ message: "Error fetching portfolio", error: error.message }));
});

module.exports = router;
