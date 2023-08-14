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
  const user = await db.User.findOne({
    where: {
      name,
      password,
    },
  });
  return user;
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

async function edit(id, name, lastname, email, password, rolId) {
  const user = await db.User.findByPk(id);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  const updatedFields = {};
  if (name) {
    updatedFields.name = name;
  }
  if (lastname) {
    updatedFields.lastname = lastname;
  }
  if (email) {
    updatedFields.email = email;
  }
  if (password) {
    updatedFields.password = password;
  }
  if (rolId) {
    updatedFields.rolId = rolId;
  }

  await user.update(updatedFields);

  return user;
}

module.exports = { login, create, edit };
