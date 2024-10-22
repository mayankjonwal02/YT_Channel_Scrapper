const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const connectDB = require('./repository/db');
const paths = require('./controller/paths');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Define a POST endpoint for scraping
app.use('/', paths);

connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});