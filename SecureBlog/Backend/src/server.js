const https = require('https');
const fs = require('fs');
const mongoose = require('mongoose'); // ✅ Fix 1: Import mongoose
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// ✅ Fix 2: Use the same variable name
const sslOptions = {
  key: fs.readFileSync('ssl/privatekey.pem'),
  cert: fs.readFileSync('ssl/certificate.pem'),
};

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    https.createServer(sslOptions, app).listen(PORT, () => {
      console.log(`✅ Secure server running at https://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
