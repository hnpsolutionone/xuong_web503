const categoryModel = require('../models/CategoryModel');

exports.getAll = async () => {
    // select * from categories
    const categories = await categoryModel.find({});
    return categories;
}