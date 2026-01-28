const categoryService = require('../services/CategoryServices');

exports.getAll = async () => {
    const categories = await categoryService.getAll();
    return categories;
}

exports.create = async (name, description) => {
    const category = await categoryService.create(name, description);
    return category;
}

exports.update = async (id, name, description) => {
    const category = await categoryService.update(id, name, description);
    return category;
}

exports.delete = async (id) => {
    const result = await categoryService.delete(id);
    return result;
}