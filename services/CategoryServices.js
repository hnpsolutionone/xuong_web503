const categoryModel = require('../models/CategoryModel');

exports.getAll = async () => {
    // select * from categories
    const categories = await categoryModel.find({});
    return categories;
}

exports.create = async (name, description) => {
    // insert into categories (name, description) values (?, ?)
    const category = new categoryModel({ name, description });
    await category.save();
    return category;
}