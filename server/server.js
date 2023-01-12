const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const app = express();

app.use(express.json());

app.use('/api/user/', require('./routes/userRoutes'));

// Main Error Handler
app.use(errorHandler);

app.listen(5000, () => {
  console.log('Listening on port 5000');
});

// Prisma Stuff
