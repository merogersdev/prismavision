// Get Environment Variables
require('dotenv').config();
const PORT = process.env.PORT || 5000;

// Express
const express = require('express');
const app = express();
const cors = require('cors');

// Oooo pretty....
const colors = require('colors');

// Import Middleware
const errorHandler = require('./middleware/errorMiddleware');

// --- CORS - Allow from Client-Side Only --- //
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

// --- JSON Parsing Middleware --- //
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- Routes and Controllers --- //
app.use('/api/user/', require('./routes/userRoutes'));
app.use('/api/images/', require('./routes/imageRoutes'));

// --- Error Handler --- //
app.use(errorHandler);

// --- Listener --- //
app.listen(PORT, () => {
  console.log(colors.blue(`> Server listening on port: ${PORT}...`));
});
