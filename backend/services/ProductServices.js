const productModel = require('../models/ProductModel');

exports.getAll = async () => {
    // select * from products
    const products = await productModel.find({});
    return products;
}

exports.create = async (name, price, quantity, description, image, categoryId, productType, viewed, status) => {
    // insert into products (name, description,...) values (?, ?)
    const product = new productModel({ name, price, quantity, description, image, categoryId, productType, viewed, status });
    await product.save();
    return product;
}

exports.update = async (id, name, price, quantity, description, image, categoryId, productType, viewed, status) => {
    // update producs set name = name, description = description,...
    // where _id = id
    const model = await productModel.findByIdAndUpdate(id, { name, price, quantity, description, image, categoryId, productType, viewed, status }, { new: true }); // { new: true } trả về document đã update
    return model;
}

exports.delete = async (id) => {
    const result = await productModel.deleteOne({ _id: id });
    return result;
}