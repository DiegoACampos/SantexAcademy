const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.belongsTo(models.Roles, {
        foreignKey: 'role_id',
      });
      Users.hasMany(models.Enrolled, {
        foreignKey: 'user_id',
      });

      // nuevo
      models.Enrolled.belongsTo(Users, {
        foreignKey: 'user_id',
      });
    }
  }
  Users.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
