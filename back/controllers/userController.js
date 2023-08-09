const userService = require('../services/userService');

async function createUser(req, res) {
  const {
    name, lastname, email, password,
  } = req.body;
  await userService.create(name, lastname, email, password);
  res.status(201).send('Usuario creado correctamente');
}

async function loginUser(req, res, next) {
  const { name, password } = req.body;
  try {
    const result = await userService.login(name, password);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { loginUser, createUser };
