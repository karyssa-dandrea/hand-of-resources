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
  });
