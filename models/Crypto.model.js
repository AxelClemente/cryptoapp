const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CryptoSchema = new Schema (
    {
        id: String,
        symbol: String,
        name: String,
        image: String,
        
    },
    {
        timestamps: true,
    }    
);

const Crypto = model("Crypo", CryptoSchema);

module.exports = Crypto;