const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.get('/', (req, res) => {
  res.send('Hit roote route');
});

app.use('/api/v1/avatar', require('./controllers/avatar'));
app.use('/api/v1/sushi', require('./controllers/sushi'));
app.use('/api/v1/shrek', require('./controllers/shrek'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
