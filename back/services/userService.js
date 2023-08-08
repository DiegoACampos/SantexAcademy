const models = require('../models');
// const jwt = require('jsonwebtoken');

async function login(name, password) {
  await models.Users.findOne({
    where: {
      name,
      password,
    },
  });
  // if(!user){
  //     throw new Error(`Id y/o password incorrectos`)
  // }

  // const token = jwt.sign({
  //     id:user.id,
  //     name:user.name,
  // }, 'claveUltraSecreta')

  // return {
  //     accesToken: token
  // }
}

module.exports = { login };
