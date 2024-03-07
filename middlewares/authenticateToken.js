// middleware/authenticateToken.js

const jwt = require('jsonwebtoken');

module.exports = function authenticateToken(req, res, next) {
  // Log para verificar el encabezado de autorización recibido
  console.log('Authorization Header:', req.headers['authorization']);

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  // Log para verificar si se recibió un token
  if (token == null) {
    console.log('No token provided');
    return res.sendStatus(401);
  }

  console.log('Token received:', token);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // Log para capturar cualquier error durante la verificación del token
    if (err) {
      console.log('Error verifying token:', err.message);
      return res.sendStatus(403);
    }

    console.log('Token verified for user:', user);
    
    req.user = user;
    next();
  });
}

