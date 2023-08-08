const models = require('../models');
// const { Users } = require('../models/users');

async function createUser(name, lastname, email, password1, password2) {
  // const user = new UsersModel(); NO
  // const user = new Users();

  const user = await models.Users();

  // const user = await new usersModel(); NO
  user.name = name;
  user.lastname = lastname;
  user.email = email;
  user.password_1 = password1;
  user.password_2 = password2;
  const userCreated = await user.save();
  return userCreated;
}

module.exports = { createUser };
