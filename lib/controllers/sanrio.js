const { Router } = require('express');
const Sanrio = require('../models/Sanrio');

module.exports = Router()
  .post('/', async (req, res) => {
    const characters = await Sanrio.insert(req.body);
    res.send(characters);
  })

  .get('/', async (req, res) => {
    const sanrio = await Sanrio.findAll();
    res.send(sanrio);
  });
