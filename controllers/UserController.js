const { User } = require("../models");
const { use } = require("../routes/users");
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
                User: newUser,
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
            console.log(e.message);
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }

}

module.exports = UserController;