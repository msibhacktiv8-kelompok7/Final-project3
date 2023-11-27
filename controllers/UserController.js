const { User } = require("../models");
const sequelize = require('sequelize')
const { comparePassword, generateToken } = require("../utils");

class UserController {
    /**
     * create user
     * password di hash & panjang antara 6 - 10
     * role default customer
     * 
     */
    static async createUser(req, res) {
        try {
            const data = req.body;
            const newUser = await User.create(data);
            return res.status(201).json({
                User: newUser
            });
        } catch (e) {
            if (e.name === "SequelizeValidationError" || e.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({
                    message: e.errors[0].message
                });
            }

            console.log(e);
            return res.status(500).json({
                message: "Internal server error"
            });
        }

    }

    static async login(req, res) {
        try {
            const data = req.body;

            const user = await User.findOne({
                where: {
                    email: data.email,
                }
            });

            if (user == null || comparePassword(data.password, user.password) == false) {
                return res.status(400).json({
                    message: "email or password worng"
                });
            }

            delete user.dataValues.password;
            const token = generateToken(user.dataValues);
            res.header('token', token);
            return res.status(200).json({
                token: token
            });
        } catch (e) {
            if (e.name === "SequelizeValidationError" || e.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({
                    message: e.errors[0].message
                });
            }
            console.log(e.message);
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }

    static async update(req, res) {
        try {
            const oldUser = req.user;
            const data = req.body;
            const newUser = await User.update({
                full_name: data.full_name || oldUser.full_name,
                email: data.email || oldUser.email
            },
                {
                    where: {
                        id: oldUser.id
                    },

                    returning: true
                });

            delete newUser[1][0].dataValues.password
            return res.status(200).json(newUser[1][0]);

        } catch (e) {
            if (e.name === "SequelizeValidationError" || e.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({
                    message: e.errors[0].message
                });
            }
            console.log(e);
            return res.status(200).json("OK");
        }
    }

    static async delete(req, res){
        try {
            const user = req.user
            const userDeleted = await User.destroy({
                where: {
                    id: user.id
                },

                returning: true
            })

            if (userDeleted === 0) {
                throw {
                    code: 400,
                    message: "Gagal Hapus user"
                };
            }
            return res.status(200).json({
                message: "Your Account has been successfully deleted"
            });
        } catch (e) {
            if (e.name === "SequelizeValidationError" || e.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({
                    message: e.errors[0].message
                });
            }
            if (e.code) {
                return res.status(e.code).json({ message: e.message });
            }
            console.log(e);
            return res.status(500).json({ message: "Internar server error" });
        }
    }

    static async topup(req, res){
        try {
            const {balance} = req.body
            const user = req.user

            const userBalanceUpdate = await User.update({
                balance: sequelize.literal(`"balance" + ${balance}`)
            },
            {
                where: {
                    id: user.id
                },
                individualHooks: true,
                returning: true
            })

            return res.status(200).json({
               message: `Your Balance  has been succesfully update to ${userBalanceUpdate[1][0].balance}`,
            })

        } catch (e) {
            if (e.name === "SequelizeValidationError" || e.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({
                    message: e.errors[0].message
                });
            }

            if (e.name || "SequelizeDatabaseError") {
                return res.status(400).json({
                    message: e.message
                });
            }
            console.log(e);
            return res.status(500).json({message: "Internl servel error"})
        }
    }

}

module.exports = UserController;