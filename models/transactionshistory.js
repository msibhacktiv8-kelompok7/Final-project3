'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionsHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product);
      this.belongsTo(models.User);
 
    }
  }
  TransactionsHistory.init({
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "quantity tidak boleh kosong"
        },
        isInt: {
          msg: "type data yang anda masukkan bukan integer"
        }
      }
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "total price tidak boleh kosong"
        },
        isInt: {
          msg: "type data yang anda masukkan bukan integer"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'TransactionsHistory',
  });
  return TransactionsHistory;
};