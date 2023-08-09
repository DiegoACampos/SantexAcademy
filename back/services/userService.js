// const jwt = require('jsonwebtoken');
const usersModel = require('../models/users.model');

async function create(name, lastname, email, password) {
  const user = {
    name,
    lastname,
    email,
    password,
    getconfig() {
      console.log(user);
    },
  };
}

async function login(name, password) {
  await usersModel.findOne({
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

module.exports = { login, create };
