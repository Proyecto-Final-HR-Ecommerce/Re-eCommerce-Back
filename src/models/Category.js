const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  brand: {
    type: String,
    required: true,
    default: "Generic",
  },
  model: {
    type: String,
    required: true,
    default: "no model",
  },
  cell: {
    type: Boolean,
    required: true,
    default: true,
  },
  case: {
    type: Boolean,
    required: false,
    default: false,
  },
  headphones: {
    type: Boolean,
    required: false,
    default: false,
  },
  charger: {
    type: Boolean,
    required: false,
    default: false,
  },
  screen: {
    type: Number,
    required: true,
    default: 0,
  },
  freeShipping: {
    type: Boolean,
    required: false,
    default: false,
  },
  ram: {
    type: Number,
    required: false,
  },
  storagessd: {
    type: Number,
    required: false,
  },
  systemOp: {
    type: String,
    required: false,
    default: "Android",
  },
  onSale: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
