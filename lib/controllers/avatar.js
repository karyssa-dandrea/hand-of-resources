const { Router } = require('express');
const Avatar = require('../models/Avatar');

module.exports = Router()
  .post('/', async (req, res) => {
    const avatars = await Avatar.insert(req.body);
    res.send(avatars);
  })

  .get('/', async (req, res) => {
    const character = await Avatar.findAll();
    res.send(character);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const avatar = await Avatar.findById(req.params.id);
      res.send(avatar);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
