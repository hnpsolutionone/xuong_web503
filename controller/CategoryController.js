const categoryService = require('../services/CategoryServices');

exports.getAll = async () => {
    const categories = await categoryService.getAll();
    return categories;
}