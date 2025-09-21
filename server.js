const cors = require("cors");
app.use(cors());

const connectDB = require("./app/config/db");
connectDB();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Import routes AFTER express is created

const eventsRouter = require('./app/routes/events');
const usersRouter = require('./app/routes/users');
const bookingsRouter = require('./app/routes/bookings');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json()); // for JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'app', 'views')));

// Routes
app.use('/events', eventsRouter);
app.use('/users', usersRouter);
app.use('/bookings', bookingsRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Event Booking App!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
