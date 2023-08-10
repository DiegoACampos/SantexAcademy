// const jwt = require('jsonwebtoken');
const db = require('../models/index');

async function create(name, lastname, email, password, rolId) {
  const user = await db.User.create({
    name,
    lastname,
    email,
    password,
    rolId,
  });
  const logedUser = user;
  return logedUser;
}

async function login(name, password) {
  const data = await db.User.findOne({
    where: {
      name,
      password,
    },
  });
  return data;
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
