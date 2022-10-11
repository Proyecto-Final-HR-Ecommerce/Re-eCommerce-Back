const Product = require("../models/Product");
const Review = require("../models/Review");

const postReview = async (req, res) => {
  const { productId } = req.params;
  const { userId } = req.body;
  if (productId && userId) {
    try {
      const review = new Review({
        product: productId,
        user: userId,
        comment: req.body.comment,
        rating: req.body.rating,
      });
      const reviewSave = await review.save();
      if (reviewSave) {
        await Product.findByIdAndUpdate(
          { _id: productId },
          {
            $set: {
              rating: req.body.rating,
              numReviews: +1,
              reviews: review._id,
            },
          }
        );
      }

      return res.status(201).json(reviewSave);
    } catch (error) {
      res.status(500).json({ msg: "Tu mamá" });
    }
  }
};
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getReview = async (req, res) => {
  const { reviewId } = req.params;
  if (reviewId) {
    const review = await Review.findById(reviewId);
    if (review) {
      return res.status(200).json(review);
    } else {
      return res.status(404).send(`Review no existente`);
    }
  }
};
const getUserReviews = async (req, res) => {
  const { userId } = req.params;
  if (userId) {
    const reviews = await Review.find({ user: userId });
    if (reviews) {
      return res.status(200).json(reviews);
    } else {
      return res.status(404).send(`Aún no hay reviews`);
    }
  }
};

const getProductReviews = async (req, res) => {
  const { productId } = req.params;
  if (productId) {
    const reviews = await Review.find({ product: productId });
    if (reviews) {
      return res.status(200).json(reviews);
    } else {
      return res.status(404).send(`Aún no hay reviews`);
    }
  }
};

const deleteReview = async (req, res) => {
  const _id = req.params.reviewId;

  try {
    // no se elimina de la bdd pero si tendra la propiedad existe : false
    const reviewMatch = await Review.findById(_id);

    reviewMatch.exists = false;

    const update = await reviewMatch.save();
    return res.status(200).json(update);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProductReviews,
  getUserReviews,
  getReview,
  postReview,
  getAllReviews,
  deleteReview,
};
