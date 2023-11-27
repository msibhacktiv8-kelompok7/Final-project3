const { Product } = require("../models");



class ProductController {
    static async create(req, res) {
        try {
            const data = req.body;
            console.log(typeof data.price);
            const newProduct = await Product.create(data);
            return res.status(201).json(newProduct);
        } catch (e) {
            if (e.name === "SequelizeValidationError" || e.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({
                    message: e.errors[0].message
                });
            }

            if (e.message.includes('fk_category')) {
                return res.status(400).json({
                    message: "Kategori id tidak ada"
                });
            }

            console.log(e.message);
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }

    static async read(req, res) {

    }

    static async update(req, res) {

    }

    static async delete(req, res) {

    }
}

module.exports = ProductController;