'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.hasMany(models.Record)
      Project.belongsTo(models.User)
    }
  }
  Project.init({
    name:{
      type : DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:'project name is required'
        },
        notEmpty:{
          msg:'project name is required'
        }
      }
    },
    UserId: {
      type : DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg:'UserId is required'
        },
        notEmpty:{
          msg:'UserId is required'
        }
      }
    },
    picture1: DataTypes.STRING,
    picture2: DataTypes.STRING,
    picture3: DataTypes.STRING,
    power:{
      type : DataTypes.STRING,
      allowNull : false,
      validate:{
        notEmpty:{
          msg:'project estimated power is required'
        },
        notNull:{
          msg:'project estimated power is required'
        },
        isInt:{
          msg:'invalid power, power must be in number format'
        }
      }
    },
    location:{
      type : DataTypes.STRING,
      allowNull : false,
      validate:{
        notNull:{
          msg:'project location is required'
        },
        notEmpty:{
          msg:'project location is required'
        }
      }
    },
    longitude: {
      type : DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:'project location (longitude) is required'
        },
        notEmpty:{
          msg:'project location (longitude) is required'
        }
      }
    },
    latitude: {
      type : DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:'project location (latitude) is required'
        },
        notEmpty:{
          msg:'project location (latitude) is required'
        }
      }
    },
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};