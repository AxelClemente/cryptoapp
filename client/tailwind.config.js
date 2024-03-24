// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ajusta a tus extensiones de archivos según sea necesario
  ],
  theme: {
    extend: {
      colors: {
        'custom-orange': '#f7931a', // Añade tu color personalizado aquí
        'bitforecast': '#fc9702', // Añade tu color personalizado aquí con un nombre clave
        'custom-black': '#353630', // Añade tu color personalizado aquí

      },
    },
  },
  plugins: [],
}