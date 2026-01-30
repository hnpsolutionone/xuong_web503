const productService = require('../services/ProductServices');

exports.getAll = async (query) => {
    const products = await productService.getAll(query);
    return products;
}

exports.getDetail = async (id) => {
    const product = await productService.getDetail(id);
    return product;
}

exports.create = async (name, price, quantity, description, image, categoryId, productType, viewed, status) => {
    const product = await productService.create(name, price, quantity, description, image, categoryId, productType, viewed, status);
    return product;
}

exports.update = async (id, name, price, quantity, description, image, categoryId, productType, viewed, status) => {
    const product = await productService.update(id, name, price, quantity, description, image, categoryId, productType, viewed, status);
    return product;
}

exports.delete = async (id) => {
    const result = await productService.delete(id);
    return result;
}