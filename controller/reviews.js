const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  req.flash("success", "New Review Created!");
  res.redirect(`/listing/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;

  let r1 = await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });
  let r2 = await Review.findByIdAndDelete(reviewId);
  console.log(r1);
  console.log(r2);

  req.flash("success", "review deleted");
  res.redirect(`/listing/${id}`);
};
