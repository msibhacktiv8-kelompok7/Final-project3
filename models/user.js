'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword, format } = require('../utils');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "full name tidak boleh kosong"
        },
        notEmpty: {
          msg: "full name tidak boleh kosong"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "email sudah terdaftar"
      },
      validate: {
        notNull: {
          msg: "full name tidak boleh kosong"
        },
        notEmpty: {
          msg: "full name tidak boleh kosong"
        },
        isEmail: {
          msg: "format email tidak valid"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password tidak boleh kosong"
        },
        notEmpty: {
          msg: "password tidak boleh kosong"
        },
        len: {
          msg: "password harus >= 6 atau <=10",
          args: [6, 10]
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "full name tidak boleh kosong"
        },
        notEmpty: {
          msg: "full name tidak boleh kosong"
        },
        isIn: {
          msg: "gender hanya bisa diisi dengan male dan female",
          args: [['male', 'female']]
        }
      }

    },
    role: {
      type: DataTypes.STRING,
    },
    balance: {
      type: DataTypes.NUMBER,
      allowNull: true,
      validate: {
        isNumeric: {
          msg: "type data yang ada masukkan bukan number"
        },
        max: {
          msg: "balance yang anda masukkan tidak boleh lebih dari 100.000.000",
          args: 100000000
        },
        min: {
          msg: "balance yang anda masukkan tidak boleh kurang dari 0",
          args: 0
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (record, options) => {
        record.dataValues.balance = 0;
        record.dataValues.role = "customer"
        record.dataValues.password = hashPassword(record.dataValues.password)
      },
      afterCreate: (record) => {
        delete record.dataValues.password;
        record.dataValues.balance = `Rp${record.dataValues.balance.toLocaleString("id-ID")}`
      },
      afterUpdate: (record) => {
        delete record.dataValues.password;
        record.dataValues.balance = `Rp${record.dataValues.balance.toLocaleString("id-ID")}`
        
      },
    }
  });
  return User;
};