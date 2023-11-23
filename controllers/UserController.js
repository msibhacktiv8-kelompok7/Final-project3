const { User } = require("../models");

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

}

module.exports = UserController;