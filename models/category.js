'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    type: {
      type: DataTypes.STRING,
      unique: {
        msg: "category sudah terdaftar",
      },
      allowNull: false,
      validate: {
        notNull: {
          msg: "category tidak boleh kosong"
        },
        notEmpty: {
          msg: "category tidak boleh kosong"
        }
      }

    },
    sold_product_amount: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "sold produc amount tidak boleh kosong"
        },
        notEmpty: {
          msg: "sold produc amount tidak boleh kosong"
        },
        isNumeric: {
          msg: "type data yang ada masukkan bukan number"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};