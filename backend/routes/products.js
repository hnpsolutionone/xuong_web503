var express = require('express');
var router = express.Router();
const productController = require('../controller/ProductController');
const categoryController = require('../controller/CategoryController');
const authen = require('../middleware/authen');

/* GET all products. */
router.get('/api/products', async function (req, res, next) {
    try {
        // get products list
        const result = await productController.getAll(req.query);
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/* GET one product. */
router.get('/api/products/:id', async function (req, res, next) {
    try {
        // get product detail
        let id = req.params.id;
        const result = await productController.getDetail(id);
        const categories = await categoryController.getAll();
        res.status(200).json({ product: result, categories: categories });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


/* Create a product. */
router.post('/api/products', [authen], async function (req, res, next) {
    try {
        let { name, price, quantity, description, image, categoryId, productType, viewed, status } = req.body;
        console.log(req.body);
        if (!name || !price || !quantity || !description || !image || !categoryId || !productType || !viewed || !status) {
            return res.status(400).json({ error: "Vui lòng cung cấp đầy đủ thông tin." });
        }
        const category = await productController.create(name, price, quantity, description, image, categoryId, productType, viewed, status);
        res.status(201).json({ data: category });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/* Update a product. */
router.put('/api/products/:id', [authen], async function (req, res, next) {
    try {
        let id = req.params.id;
        let { name, price, quantity, description, image, categoryId, productType, viewed, status } = req.body;
        if (!name || !price || !quantity || !description || !image || !categoryId || !productType || !viewed || !status) {
            return res.status(400).json({ error: "Vui lòng cung cấp đầy đủ thông tin." });
        }
        const category = await productController.update(id, name, price, quantity, description, image, categoryId, productType, viewed, status);
        res.status(200).json({ data: category });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


/* Delete a category. */
router.delete('/api/products/:id', [authen], async function (req, res, next) {
    try {
        let id = req.params.id;
        const result = await productController.delete(id);
        res.status(200).json({ status: result['deletedCount'] == 1 ? true : false });
    } catch (error) {
        res.status(500).json({ error: 'error.message' });
    }
});

module.exports = router;
