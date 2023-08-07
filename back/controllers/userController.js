const userService = require('../services/userService');

async function loginUser(req, res, next) {
  const { name, password } = req.body;
  try {
    const result = await userService.login(name, password);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { loginUser };
