const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Courses.hasMany(models.Enrolled, {
        foreignKey: 'course_id',
      });

      // nuevo
      models.Enrolled.belongsTo(Courses, {
        foreignKey: 'course_id',
      });
    }
  }
  Courses.init({
    title: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Courses',
  });
  return Courses;
};
