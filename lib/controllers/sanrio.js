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
  })

  .get('/:id', async (req, res, next) => {
    try {
      const sanriochar = await Sanrio.findById(req.params.id);
      res.send(sanriochar);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
