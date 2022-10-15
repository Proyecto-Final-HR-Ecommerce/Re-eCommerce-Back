const mongoose = require("mongoose");

const productsShema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  comment: {
    type: String,
    required: false,
  },

  price: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  ordered: {
    type: Number,
    default: 0,
  },

  stock: {
    type: Number,
    required: true,
  },

  //stockFalse .... .|.
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },

  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  reviews: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Review",
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
  arrayImag: [
    {
      type: String,
      required: false,
    },
  ],
  exists: {
    type: Boolean,
    default: true,
  },
});

const Product = mongoose.model("Product", productsShema);

module.exports = Product;
