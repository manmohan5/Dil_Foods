const mongoose = require('mongoose');
const {Schema, model}  = mongoose;

const productSchema = new Schema({
    name: { type: String, unique: true },
    price: { type: Number, unique: false },
    status: { type: String, default: "active" },
    company: { type: String, unique: false },
    date: {  type: Date,  default: Date.now },
    items: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
        },
      ],
})

const Product  = model('Product', productSchema );

module.exports = Product