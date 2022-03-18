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
  })

  .get('/:id', async (req, res, next) => {
    try {
      const creatures = await Shrek.findById(req.params.id);
      res.send(creatures);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const creatures = await Shrek.updateById(req.params.id, req.body);
    res.send(creatures);
  });
