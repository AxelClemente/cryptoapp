const mongoose = require('mongoose');

const connectDatabase = async () => {
  const uri = process.env.MONGO_URI; // Ensure that 'URI' contains the complete connection string

  try {
    const conn = await mongoose.connect(uri);

    console.log(`Connected to Mongo! Database name: "${conn.connection.name}"`);
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas:', err);
    process.exit(1);
  }
};

module.exports = connectDatabase;



