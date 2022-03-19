const { Router } = require('express');
const HarryPotter = require('../models/HarryPotter');

module.exports = Router()
  .post('/', async (req, res) => {
    const characters = await HarryPotter.insert(req.body);
    res.send(characters);
  })

  .get('/', async (req, res) => {
    const hp = await HarryPotter.findAll();
    res.send(hp);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const hpId = await HarryPotter.findById(req.params.id);
      res.send(hpId);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const hpId = await HarryPotter.updateById(req.params.id, req.body);
    res.send(hpId);
  });
