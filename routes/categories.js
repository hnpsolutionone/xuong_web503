var express = require('express');
var router = express.Router();
const categoryController = require('../controller/CategoryController');

/* GET all categories. */
router.get('/api/categories', async function (req, res, next) {
    try {
        // get categories list
        const result = await categoryController.getAll();
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


/* Create a category. */
router.post('/api/categories', async function (req, res, next) {
    try {
        let { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ error: "Vui lòng cung cấp đầy đủ thông tin." });
        }
        const category = await categoryController.create(name, description);
        res.status(201).json({ data: category });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
