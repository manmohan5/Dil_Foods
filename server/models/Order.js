const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const OrderSchema = new Schema({
  orderId: { type: String, unique: true },
  status: { type: String, default: "active" },
  date: { type: Date, default: Date.now },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

const Order = model("Order", OrderSchema);

module.exports = Order;
