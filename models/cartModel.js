const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    totalPrice: {
      type: Number,
      default: 1,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
