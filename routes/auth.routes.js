// auth.routes.js

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Asegúrate de que la ruta al modelo es correcta.
const router = express.Router();
const jwt = require('jsonwebtoken');



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

    // Guardar el usuario en la base de datos
    const savedUser = await newUser.save();

    // Generar un token JWT para el nuevo usuario
    const token = jwt.sign({ id: savedUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });

    // Enviar una respuesta al cliente con el nuevo usuario y el token
    res.status(201).json({ user: savedUser, token });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el usuario", error: error.message });
  }
});


// router.post('/login', async (req, res) => {
//   // Intentar encontrar al usuario basado en el correo electrónico
//   const user = await User.findOne({ email: req.body.email });
//   if (user && await bcrypt.compare(req.body.password, user.password)) {
//     // Las credenciales son correctas, generar un token
//     const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET);
//     res.json({ token });
//   } else {
//     // Credenciales incorrectas
//     res.status(401).send('Correo electrónico o contraseña incorrectos');
//   }
// });

router.post('/login', async (req, res) => {
  // Encuentra al usuario por su email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
      return res.status(404).send('Usuario no encontrado');
  }

  // Comprueba si la contraseña es correcta
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
      return res.status(400).send('Contraseña incorrecta');
  }

  // Genera un token JWT
  const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

  // Envía el token al cliente
  res.json({ token });
});

module.exports = router;

