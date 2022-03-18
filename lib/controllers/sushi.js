const { Router } = require('express');
const Sushi = require('../models/Sushi');

module.exports = Router()
  .post('/', async (req, res) => {
    const sushi = await Sushi.insert(req.body);
    res.send(sushi);
  })

  .get('/', async (req, res) => {
    const nigiri = await Sushi.findAll();
    res.send(nigiri);
  });
