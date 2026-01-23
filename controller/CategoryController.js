const categoryService = require('../services/CategoryServices');

exports.getAll = async () => {
    const categories = await categoryService.getAll();
    return categories;
}

exports.create = async (name, description) => {
    const category = await categoryService.create(name, description);
    return category;
}