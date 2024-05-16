// ... Otras importaciones
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const axios = require('axios');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
require('dotenv').config();


// En el archivo holdings.routes.js

const Portfolio = require('../models/Portfolio'); // Asegúrate de importar el modelo correctamente

// Manejador de ruta para obtener el portafolio
router.get('/holdings', authenticateToken, (req, res) => { // Asegúrate de usar el middleware authenticateToken para tener acceso a req.user
  Portfolio.findOne({ userId: req.user.id }) // Encuentra el portafolio basado en el userId obtenido del token JWT
    .then(portfolio => {
      if (!portfolio) {
        return res.status(404).json({ message: "Portfolio not found" });
      }
      // console.log("Portfolio encontrado:", portfolio); // Aquí agregas el console.log
      res.json(portfolio);
    })
    .catch(error => res.status(500).json({ message: "Error fetching portfolio", error: error.message }));
});

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER, // Usar variable de entorno para el usuario
//     pass: process.env.EMAIL_PASS  // Usar variable de entorno para la contraseña
//   }
// });

// // Endpoint para configurar una alerta de precios
// router.post('/setPriceAlert', authenticateToken, async (req, res) => {
//   const { cryptoId, targetPrice, email } = req.body;
//   const userId = req.user.id;  // ID del usuario extraído del token
//   console.log("user id", userId)
//   console.log("req body", req.body)

  
//   if (!req.user) {
//     console.log("No user info available in request.");
//     return res.status(401).json({ message: "Unauthorized - No user info available" });
//   }

//   if (!email) {
//     return res.status(400).json({ message: "User email is not available." });
//   }

//   try {
//     // Programar la verificación del precio cada minuto
//     const job = schedule.scheduleJob('*/10 * * * *', async function() {
//       console.log(`Verificando precio para ${cryptoId}`);
//       const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd`);
//       const currentPrice = response.data[cryptoId].usd;
      
//       if (Math.abs(currentPrice - targetPrice) / targetPrice < 0.05) { // Chequeo con 5% de rango permitido
//         console.log(`Precio objetivo cercano para ${cryptoId}: $${currentPrice}`);
        
//         // Enviar correo electrónico
//         await transporter.sendMail({
//           from: process.env.EMAIL_USER,
//           to: email,
//           subject: `Alerta de Precio para ${cryptoId}`,
//           text: `El precio de ${cryptoId} está cerca del objetivo: $${currentPrice} (objetivo: $${targetPrice})`
//         });

//         console.log(`Alerta enviada a ${email} para ${cryptoId} al precio $${currentPrice}`);
//         job.cancel(); // Detener la tarea programada después de enviar el correo
//       }
//     });

//     res.json({ message: "Alerta configurada exitosamente." });
//   } catch (error) {
//     console.error("Error setting price alert:", error);
//     res.status(500).json({ message: "Error configuring price alert", error: error.message });
//   }
// });


// module.exports = router;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Endpoint para configurar una alerta de precios
router.post('/setPriceAlert', authenticateToken, async (req, res) => {
  const { cryptoId, targetPrice, email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required but not provided." });
  }

  try {
    // Enviar correo de confirmación inmediatamente
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Confirmación de Alerta de Precio para ${cryptoId}`,
      text: `Has configurado una alerta para ${cryptoId} al precio objetivo de $${targetPrice}. Te notificaremos inmediatamente cuando el precio alcance o esté muy cerca de este objetivo. ¡Gracias por confiar en BitForesCast!`
    });

    // Programar la verificación del precio
    const job = schedule.scheduleJob('0 0 * * *', async function() {
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd`);
      const currentPrice = response.data[cryptoId].usd;

      if (Math.abs(currentPrice - targetPrice) / targetPrice < 0.05) { // Chequeo con 5% de rango permitido
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: `Alerta de Precio Alcanzado para ${cryptoId}`,
          text: `El precio de ${cryptoId} ha alcanzado el objetivo de $${targetPrice}. Precio actual: $${currentPrice}.`
        });
        job.cancel(); // Detener la tarea programada después de enviar el correo
      }
    });

    res.json({ message: "Alerta configurada y correo de confirmación enviado exitosamente." });
  } catch (error) {
    console.error("Error setting price alert:", error);
    res.status(500).json({ message: "Error configuring price alert", error: error.message });
  }
});

module.exports = router;