const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    image: { type: String, required: true },
    categoryId: { type: ObjectId, ref: 'category' },
    productType: { type: Number, required: true, default: 0 }, //0: Normal, 1: Hot, 2: New, 3: Sale
    viewed: { type: Number, required: true, default: 0 },
    status: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model('product', ProductSchema);