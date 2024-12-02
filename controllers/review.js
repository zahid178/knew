const Listing = require("../models/listing");
const Review = require("../models/review");

// module.exports.createReview = async (req, res) => {
//     try {
//       let listing = await Listing.findById(req.params.id);
//       let newReview = new Review(req.body.review);
//       newReview.author = req.user._id;
  
//       listing.reviews.push(newReview);
//       await newReview.save();
//       await listing.save();
//       req.flash("success", "New review created!");  // This sets a success message
//       res.redirect(`/listings/${listing._id}`);
//     } catch (error) {
//       req.flash("error", "Something went wrong, try again.");  // Handle errors and set error message
//       res.redirect("back");
//     }
// }

module.exports.createReview = async (req, res) => {
  try {
    console.log(req.body.review);  // Log the review data to check if the rating is correctly passed

    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New review created!");
    res.redirect(`/listings/${listing._id}`);
  } catch (error) {
    req.flash("error", "Something went wrong, try again.");
    res.redirect("back");
  }
}

module.exports.destroyReview = async(req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted");
    res.redirect(`/listings/${id}`);
  };
