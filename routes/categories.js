var express = require('express');
var router = express.Router();
const categoryController = require('../controller/CategoryController');

/* GET all categories. */
router.get('/api/categories', async function(req, res, next) {
    try {
        // get categories list
        const result =  await categoryController.getAll();
        res.status(200).json({ data: result });
      } catch (error) {
        res.status(414).json({ error: error.message });
      }
});

module.exports = router;
