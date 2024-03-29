// En tu archivo de rutas de Express (por ejemplo, index.routes.js o un archivo similar)

const express = require("express");
const router = express.Router();

// Endpoint simplificado para propósitos de prueba
router.get("/test-backend", (req, res) => {
    // Envía una respuesta simple para verificar si el endpoint funciona correctamente
    res.status(200).json({ message: "Esto es un mensaje para seguir construyendo una gran app - Axel!" });
});

module.exports = router;
