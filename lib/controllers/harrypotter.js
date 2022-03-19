const { Router } = require('express');
const HarryPotter = require('../models/HarryPotter');

module.exports = Router().post('/', async (req, res) => {
  const characters = await HarryPotter.insert(req.body);
  res.send(characters);
});
