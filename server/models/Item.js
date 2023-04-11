const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const itemSchema = new Schema({
  price: { type: Number, unique: false },
  quantity: { type: Number, unique: false },
  name: { type: String, unique: false },
  date: { type: Date, default: Date.now },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

const Item = model("Item", itemSchema);

module.exports = Item;
