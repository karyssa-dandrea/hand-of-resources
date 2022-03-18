const { Router } = require('express');
const Shrek = require('../models/Shrek');

module.exports = Router()
  .post('/', async (req, res) => {
    const shrekChar = await Shrek.insert(req.body);
    res.send(shrekChar);
  })

  .get('/', async (req, res) => {
    const characters = await Shrek.findAll();
    res.send(characters);
  });
