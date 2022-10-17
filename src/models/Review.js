const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
    default: "Any Comments",
  },
  exists: {
    type: Boolean,
    default: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  made: {
    type: Date,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
