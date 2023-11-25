const { User, Category, Product } = require("../models");
const sequelize = require('sequelize');

class CategoriesController {
    static async create(req, res) {
        try {
            const data = req.body;
            const categories = await Category.create(data);
            return res.status(201).json({
                category: categories,
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

    static async get(req, res) {
        try {
            const categories = await Category.findAll({
                include: {
                    model: Product
                }
            }
            );
            return res.status(200).json({
                categories: categories,
            });

        } catch (e) {
            console.log(e);
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }

    static async update(req, res) {
        try {
            const { categoryId } = req.params;
            console.log(req.params);
            const data = req.body;
            const categoryUpdated = await Category.update({
                type: data.type
            }, {
                where: {
                    id: categoryId
                },
                returning: true
            });

            if (categoryUpdated[0] == false) {
                return res.status(400).json({
                    message: "gagal Update "
                });
            }

            res.status(200).json({
                category: categoryUpdated[1][0]
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

module.exports = CategoriesController;