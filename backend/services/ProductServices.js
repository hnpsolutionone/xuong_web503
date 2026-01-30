const productModel = require('../models/ProductModel');

exports.getAll = async (query) => {
    //nếu link có query api/products??categoryId=66f79ee650d6a85cdab75499&keyword=Iphone&productType=0&viewed=1&limit=10
    let products = {}; let limit = 50;
    if (query && Object.keys(query).length !== 0) {
        const { categoryId, keyword, productType, viewed, limit } = query;
        let queries = {};
        
        // Apply keyword query if provided
        if (keyword) {
            /*
            $regex là một toán tử của MongoDB cho phép chúng ta thực hiện tìm kiếm dựa trên biểu thức
            Biểu thức new RegExp(search, 'i') được sử dụng để tạo ra một biểu thức từ chuỗi keyword 
            và cờ 'i' để chỉ định tìm kiếm không phân biệt chữ hoa chữ thường.
            */
            queries.name = { $regex: new RegExp(keyword, 'i') };
        }
        // Apply category filter if provided
        if (categoryId) {
            queries.categoryId = categoryId;
        }
        // Apply productType filter if provided
        if (productType) {
            queries.productType = productType;
        }
        console.log(queries);
        // sort by viewed
        if (viewed == -1) {
            products = await productModel.find(queries).sort({ viewed: -1 }).limit(limit);
        } else if (viewed == 1) {
            products = await productModel.find(queries).sort({ viewed: 1 }).limit(limit);
        } else {
            products = await productModel.find(queries).limit(limit).populate('categoryId', '_id name');
        }
    } else {
        // select * from products
        products = await productModel.find({}).limit(limit).populate('categoryId', '_id name'); // tự động map với Object category và lấy ra fields _id và name
    }
    return products;
}

exports.getDetail = async (id) => {
    // select * from products where _id = id
    const product = await productModel.findOne({_id: id});
    return product;
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