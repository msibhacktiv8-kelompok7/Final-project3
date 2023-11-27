'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "title tidak boleh kosong"
        },
        notEmpty: {
          msg: "title tidak boleh kosong"
        }
      }
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "price tidak boleh kosong"
        },
        notEmpty: {
          msg: "price tidak boleh kosong"
        },
        isNumeric: {
          msg: "type data yang ada masukkan bukan number"
        },
        max: {
          msg: "balance yang anda masukkan tidak boleh lebih dari 50.000.000",
          args: 50000000
        },
        min: {
          msg: "balance yang anda masukkan tidak boleh kurang dari 0",
          args: 0
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "stock tidak boleh kosong"
        },
        notEmpty: {
          msg: "stock tidak boleh kosong"
        },
        isNumeric: {
          msg: "stock harus berupa number"
        },
        min: {
          msg: "stock minimal harus 5",
          args: 5
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "categoryId tidak boleh kosong"
        },
        notEmpty: {
          msg: "categoryId tidak boleh kosong"
        },
        isNumeric: {
          msg: "CategoryId harus berupa number"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};