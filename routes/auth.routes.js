// auth.routes.js

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Asegúrate de que la ruta al modelo es correcta.
const router = express.Router();


// Ruta para el registro de usuarios
router.post("/signup", async (req, res) => {
  try {
    // Generar un hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    // Crear un nuevo usuario con la contraseña hasheada
    const newUser = new User({
      name: req.body.name,
      password: hashPass,
      email: req.body.email,
    });
    console.log("Se ha creado el usuario", newUser)

    // Guardar el usuario en la base de datos
    const savedUser = await newUser.save();

    // Enviar una respuesta al cliente
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el usuario", error: error.message });
  }
});

module.exports = router;

