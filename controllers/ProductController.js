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

            console.log(e.message);
            if (e.message.includes('fk_category') || e.message.includes('fk_categories')) {
                return res.status(400).json({
                    message: "Kategori id tidak ada"
                });
            }


            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }

    static async read(req, res) {
        try {
            const products = await Product.findAll();
            return res.status(200).json({
                products: products
            });
        } catch (e) {
            if (e.name === "SequelizeValidationError" || e.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({
                    message: e.errors[0].message
                });
            }

            console.log(e);
            if (e.message.includes('fk_category')) {
                return res.status(400).json({
                    message: "Kategori id tidak ada"
                });
            }


            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }

    static async update(req, res) {
        try {
            const { productId } = req.params;
            console.log(req.params);
            const data = req.body;
            const productUpdated = await Product.update(data, {
                where: {
                    id: productId
                },
                returning: true
            });

            if (productUpdated[0] == false) {
                return res.status(400).json({
                    message: "gagal Update product"
                });
            }

            res.status(200).json({
                product: productUpdated[1][0]
            });
        } catch (e) {
            if (e.name === "SequelizeValidationError" || e.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({
                    message: e.errors[0].message
                });
            }

            console.log(e);
            if (e.message.includes('fk_category')) {
                return res.status(400).json({
                    message: "Kategori id tidak ada"
                });
            }
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }

    static async updatePatch(req, res) {
        try {
            const { productId } = req.params;
            console.log(req.params);
            const data = req.body;
            const productUpdated = await Product.update(data, {
                where: {
                    id: productId
                },
                returning: true
            });

            if (productUpdated[0] == false) {
                return res.status(400).json({
                    message: "gagal Update product"
                });
            }

            res.status(200).json({
                product: productUpdated[1][0]
            });
        } catch (e) {
            if (e.name === "SequelizeValidationError" || e.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({
                    message: e.errors[0].message
                });
            }

            console.log(e);
            if (e.message.includes('fk_category')) {
                return res.status(400).json({
                    message: "Kategori id tidak ada"
                });
            }
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }

    static async delete(req, res) {
        try {
            const { categoryId } = req.params;
            console.log(req.params);
            const data = req.body;
            const categoryUpdated = await Product.update({
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

    static async delete(req, res) {
        try {
            const { productId } = req.params;
            const productDelete = await Product.destroy({
                where: {
                    id: productId
                },
                returning: true
            });

            if (productDelete[0] == false) {
                return res.status(400).json({
                    message: "gagal delete Product "
                });
            }

            res.status(200).json({
                message : "Product has been successfully deleted"
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

module.exports = ProductController;