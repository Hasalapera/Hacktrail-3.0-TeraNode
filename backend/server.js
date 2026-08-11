// 'import' wenuwata 'require' pawichchi kirima
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// .env file eke thiyena variables load karanna
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(express.json());

// Moolika API Route eka
app.get('/', (req, res) => {
  res.send('Hacktrail API is running perfectly! 🚀 (Using CommonJS)');
});

// Server eka start kirima
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});