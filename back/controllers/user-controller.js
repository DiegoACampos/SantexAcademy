const userService = require('../services/user-service');

async function createUser(req, res) {
  const {
    name, lastname, email, password1, password2,
  } = req.body;
  const user = await userService.createUser(name, lastname, email, password1, password2);
  res.status(201).send(user);
}

module.exports = { createUser };
