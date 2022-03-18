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
  })

  .get('/:id', async (req, res, next) => {
    try {
      const sush = await Sushi.findById(req.params.id);
      res.send(sush);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const sush = await Sushi.updateById(req.params.id, req.body);
    res.send(sush);
  });
