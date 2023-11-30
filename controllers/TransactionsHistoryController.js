const { TransactionsHistory, Product, User } = require("../models");
const sequelize = require('sequelize');

class TransactionsHistoryController {
    static async create(req, res) {

        try {
            const data = req.body;
            const user = req.user;
            const userold = await User.findOne({
                where: {
                    id: user.id
                }
            });

            const productold = await Product.findOne({
                where: {
                    id: data.productId
                }
            });

            if (userold === null) {
                return res.status(400).json({
                    message: "user tidak ada"
                });
            }

            if (productold === null) {
                return res.status(400).json({
                    message: "product tidak ditemukan"
                });
            }


            if ((productold.stock - data.quantity) < 0) {
                return res.status(400).json({
                    message: "stok kurang"
                });
            }

            if ((userold.balance - (data.quantity * productold.price)) < 0) {
                return res.status(400).json({
                    message: "uang anda tidak cukup"
                });
            }

            const newProduct = await Product.update({
                stock: productold.stock - data.quantity
            }, {
                where: {
                    id: data.productId
                },
                individualHooks: true
            });
            var a = userold.balance - (data.quantity * productold.price);
            console.log(a);
            const newUser = await User.update({
                balance: a
            }, {
                where: {
                    id: userold.id
                },
                individualHooks: true
            });

            const transaction = await TransactionsHistory.create({
                ProductId: productold.id,
                UserId: userold.id,
                quantity: data.quantity,
                total_price: (data.quantity * productold.price)
            });


            return res.status(201).json({
                message: "you have successfully purchase the product",
                transactionBill: {
                    total_price: transaction.total_price,
                    quantity: transaction.quantity,
                    product_name: productold.title
                }
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

    static async readuser(req, res) {
        try {
            const user = req.user;

            const userdb = await User.findOne({
                where: {
                    id: user.id
                }
            });


            const transaction = await TransactionsHistory.findAll({
                where: {
                    UserId: userdb.id
                },
                include: {
                    model: Product
                }
            });

            res.status(200).json({
                transactionHistories: transaction
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
    static async readadmin(req, res) {
        try {
            const user = req.user;
            const transaction = await TransactionsHistory.findAll({
                include: [
                    {
                        model: Product
                    },
                    {
                        model: User,
                        attributes: ['id', 'email', 'balance', 'gender', 'role']
                    }
                ]
            });

            res.status(200).json({
                transactionHistories: transaction
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
    static async getbyid(req, res) {
        try {
            const id = req.params.transactionId
            const transaction = await TransactionsHistory.findOne({
                where: {
                    id: id
                },
                include: [
                    {
                        model: Product
                    }
                ]
            });

            if (transaction === null) {
                return res.status(400).json({
                    message: "transaction tidak ditemukan"
                });
            }

            return res.status(200).json({
                transactionHistories: transaction
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

module.exports = TransactionsHistoryController;