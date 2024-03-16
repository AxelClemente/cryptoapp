require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const connectDatabase = require('./config/database');
const authRoutes = require('./routes/auth.routes')
const portfolioRoutes = require('./routes/portfolio.routes')
const holdingsRoutes = require('./routes/holdings.routes');
const indexRoutes = require('./routes/index.routes'); // Ajusta la ruta según sea necesario
const app = express();
const routes = require('./routes/routes');

//cambio a estructura de cors abiertaaaaa
app.use(cors({
  credentials: true,
  origin: true
}));

// app.use(cors({
//     credentials: true,
//     origin: ['http://localhost:3001', process.env.ORIGIN] // Aquí se agregan los orígenes permitidos
// }));

app.use(express.static('public'));

// Conectar a la base de datos
connectDatabase();

// Usar las rutas definidas
app.use(routes);
app.use(express.json()); // Middleware para parsear JSON
// app.use(cors());



// Rutas de autenticación
app.use("/auth", authRoutes);
app.use("/portfolio", portfolioRoutes)
app.use('/api', holdingsRoutes); // Asegúrate de que 'api' esté en la ruta
app.use("/", indexRoutes);

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;