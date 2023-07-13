'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Project)
    }
  }
  User.init({
    email:{
      type : DataTypes.STRING,
      allowNull : false,
      unique:true,
      validate:{
        notNull:{
          msg:'email is required'
        },
        notEmpty:{
          msg:'email is required'
        },
        isEmail:{
          msg:'invalid email format'
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate:{
        notNull:{
          msg:'password is required'
        },
        notEmpty:{
          msg:'password is required'
        },
        len: {
          args: [6, Infinity],
          msg: 'The password must have at least six characters',
        },
      }
    },
    username:{
      type :  DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg :'username is required'
        },
        notNull:{
          msg:'username is required'
        }
      }
    },
    profile_picture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};