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
      allowNull: false,
      validate: {
        notNull: {
          msg: "password tidak boleh kosong"
        },
        notEmpty: {
          msg: "password tidak boleh kosong"
        },
        len: [6, 10]
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
      allowNull: false,
      defaultValue: "customer",
      validate: {
        notNull: {
          msg: "full name tidak boleh kosong"
        },
        notEmpty: {
          msg: "full name tidak boleh kosong"
        },
        isIn: {
          msg: "role hanya bisa diisi dengan admin dan customer",
          args: [['admin', 'customer']]
        }
      }
    },
    balance: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "balance tidak boleh kosong"
        },
        notEmpty: {
          msg: "balance tidak boleh kosong"
        },
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
      // set balance to 0
      beforeCreate: (record, options) => {
        record.dataValues.balance = 0;
      },
      // set balance to rupiah
      afterCreate: (record, options) => {
        record.dataValues.balance = `Rp${record.dataValues.balance.toLocaleString("id-ID")}`
      }
    }
  });
  return User;
};