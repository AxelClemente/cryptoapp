// auth.routes.js
// TEST!

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Asegúrate de que la ruta al modelo es correcta.
const router = express.Router();
const jwt = require('jsonwebtoken');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
  const { token } = req.body; // Recibe el token de Google directamente

  // console.log("Recibiendo solicitud de login con Google con token:", token);

  try {
    // Verifica el token con Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Especifica el CLIENT_ID de la app
    });
    const payload = ticket.getPayload();

    // Extrae email y name del payload del token
    const { email, name } = payload;

    // Busca o crea el usuario en la base de datos
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        name,
        email,
        password: null, // Almacenar un valor placeholder seguro si es necesario
      });
      await user.save();
      console.log("Usuario guardado exitosamente:", user);
    }

    // Genera tu propio token para el usuario
    const customToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });

    res.status(200).json({ user, token: customToken });
  } catch (error) {
    console.error("Error al verificar el token de Google:", error);
    res.status(500).json({ message: "Error al procesar el inicio de sesión con Google", error: error.toString() });
  }
});



// Ruta para el registro de usuarios
// router.post("/signup", async (req, res) => {
//   try {
//     // Generar un hash de la contraseña
//     const salt = await bcrypt.genSalt(10);
//     const hashPass = await bcrypt.hash(req.body.password, salt);

//     // Crear un nuevo usuario con la contraseña hasheada
//     const newUser = new User({
//       name: req.body.name,
//       password: hashPass,
//       email: req.body.email,
//     });

//     // Guardar el usuario en la base de datos
//     const savedUser = await newUser.save();

//     // Generar un token JWT para el nuevo usuario
//     const token = jwt.sign({ id: savedUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });

//     // Enviar una respuesta al cliente con el nuevo usuario y el token
//     res.status(201).json({ user: savedUser, token });
//   } catch (error) {
//     res.status(500).json({ message: "Error al crear el usuario", error: error.message });
//   }
// });

// router.post('/google', async (req, res) => {
//   const { email, name } = req.body; // Suponiendo que estos datos vienen del cliente y fueron extraídos del token de Google

//   console.log("Recibiendo solicitud de login con Google:", req.body); // Ver los datos recibidos del front


//   try {
//     let user = await User.findOne({ email });

//     if (!user) {
//       // Si no existe el usuario, crea uno nuevo
//       user = new User({
//         name,
//         email,
//         password: null, // Puedes decidir no almacenar una contraseña, o almacenar un valor placeholder seguro
//       });
//       await user.save();
//       console.log("Usuario guardado exitosamente:", user); // Confirmar que el usuario ha sido guardado

//     }

//     // Independientemente de si el usuario es nuevo o existente, genera tu propio token
//     const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });

//     res.status(200).json({ user, token });
//   } catch (error) {
//     res.status(500).json({ message: "Error al procesar el inicio de sesión con Google", error: error.message });
//   }
// });


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

// router.post('/login', async (req, res) => {
//   // Encuentra al usuario por su email
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) {
//       return res.status(404).send('Usuario no encontrado');
//   }

//   // Comprueba si la contraseña es correcta
//   const isMatch = await bcrypt.compare(req.body.password, user.password);
//   if (!isMatch) {
//       return res.status(400).send('Contraseña incorrecta');
//   }

//   // Genera un token JWT
//   const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

//   // Envía el token al cliente
//   res.json({ token });
// });

module.exports = router;

