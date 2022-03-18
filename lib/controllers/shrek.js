const { Router } = require('express');
const Shrek = require('../models/Shrek');

module.exports = Router().post('/', async (req, res) => {
  const shrekChar = await Shrek.insert(req.body);
  res.send(shrekChar);
});
