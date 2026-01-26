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

exports.update = async (id,name, description) => {
    // update categories set name = name, description = description
    // where _id = id
    const model = await categoryModel.findByIdAndUpdate(id, { name, description }, { new: true }); // { new: true } trả về document đã update
    return model;
}

exports.delete = async (id) => {
    const result = await categoryModel.deleteOne({ _id: id });
    return result;
}