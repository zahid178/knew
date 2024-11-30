// const Listing = require("../models/listing");

// module.exports.index = async (req, res) => {
//   const allListings = await Listing.find({});
//   res.render("listings/index", { allListings });
// };

// module.exports.renderNewForm = (req, res) => {
//   res.render("listings/new");
// };

// module.exports.showListing = async (req, res) => {
//   const { id } = req.params;
//   const listing = await Listing.findById(id)
//     .populate({
//       path: "reviews",
//       populate: { path: "author" },
//     })
//     .populate("owner");
//   if (!listing) {
//     req.flash("error", "Listing you requested for does not exist!");
//     return res.redirect("/listings");
//   }
//   res.render("listings/show", { listing });
// };

// module.exports.createListing = async (req, res, next) => {
//   try {
//     if (!req.body.listing) {
//       req.flash("error", "Listing data is required.");
//       return res.status(400).redirect("/listings/new"); // Use numeric status codes
//     }
//     const newListing = new Listing(req.body.listing);
//     newListing.owner = req.user._id;
//     await newListing.save();
//     req.flash("success", "New Listing Created");
//     res.redirect("/listings");
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports.renderEditForm = async (req, res) => {
//   const { id } = req.params;
//   const listing = await Listing.findById(id);
//   if (!listing) {
//     req.flash("error", "Listing you requested for does not exist!");
//     return res.redirect("/listings");
//   }
//   res.render("listings/edit", { listing });
// };

// module.exports.updateListing = async (req, res) => {
//   const { id } = req.params;
//   if (!req.body.listing) {
//     req.flash("error", "Listing data is required.");
//     return res.status(400).redirect(`/listings/${id}/edit`);
//   }
//   await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//   req.flash("success", "Listing Updated!");
//   res.redirect(`/listings/${id}`);
// };

// module.exports.destroyListing = async (req, res) => {
//   const { id } = req.params;
//   await Listing.findByIdAndDelete(id);
//   req.flash("success", "Listing Deleted");
//   res.redirect("/listings");
// };











// const Listing = require("../models/listing");

// module.exports.index = async (req, res) => {
//   const allListings = await Listing.find({});
//   res.render("listings/index", { allListings });
// };

// module.exports.renderNewForm = (req, res) => {
//   res.render("listings/new.ejs");
// };

// module.exports.showListing = async (req, res) => {
//   const { id } = req.params;
//   const listing = await Listing.findById(id)
//     .populate({
//       path: "reviews",
//       populate: { path: "author" },
//     })
//     .populate("owner");
//   if (!listing) {
//     req.flash("error", "Listing you requested for does not exist!");
//     return res.redirect("/listings");
//   }
//   res.render("listings/show.ejs", { listing });
// };

// // module.exports.createListing = async (req, res, next) => {
// //   try {
// //     if (!req.body.listing) {
// //       req.flash("error", "Listing data is required.");
// //       return res.status(400).redirect("/listings/new"); // Use numeric status codes
// //     }
// //     const newListing = new Listing(req.body.listing);
// //     newListing.owner = req.user._id;
// //     await newListing.save();
// //     req.flash("success", "New Listing Created");
// //     res.redirect("/listings");
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// module.exports.createListing = async (req, res, next) => {
//   try {
//     if (!req.body.listing) {
//       req.flash("error", "Listing data is required.");
//       return res.redirect("/listings/new"); // Removed status(400)
//     }
//     const newListing = new Listing(req.body.listing);
//     newListing.owner = req.user._id;
//     await newListing.save();
//     req.flash("success", "New Listing Created");
//     res.redirect("/listings");
//   } catch (error) {
//     next(error); // Pass any errors to the error-handling middleware
//   }
// };

// module.exports.renderEditForm = async (req, res) => {
//   const { id } = req.params;
//   const listing = await Listing.findById(id);
//   if (!listing) {
//     req.flash("error", "Listing you requested for does not exist!");
//     return res.redirect("/listings");
//   }
//   res.render("listings/edit.ejs", { listing });
// };

// module.exports.updateListing = async (req, res) => {
//   const { id } = req.params;
//   if (!req.body.listing) {
//     req.flash("error", "Listing data is required.");
//     return res.status(400).redirect(`/listings/${id}/edit`);
//   }
//   await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//   req.flash("success", "Listing Updated!");
//   res.redirect(`/listings/${id}`);
// };

// module.exports.destroyListing = async (req, res) => {
//   const { id } = req.params;
//   await Listing.findByIdAndDelete(id);
//   req.flash("success", "Listing Deleted");
//   res.redirect("/listings");
// };




const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  try {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
  } catch (error) {
    req.flash("error", "Unable to retrieve listings.");
    res.redirect("/listings");
  }
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: { path: "author" },
      })
      .populate("owner");

    if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
  } catch (error) {
    req.flash("error", "Error retrieving listing details.");
    res.redirect("/listings");
  }
};

// module.exports.createListing = async (req, res, next) => {
//   try {
//     if (!req.body.listing) {
//       req.flash("error", "Listing data is required.");
//       return res.redirect("/listings/new"); // Redirect to the new listing form
//     }
    
//     const newListing = new Listing(req.body.listing);
//     newListing.owner = req.user._id; // Ensure the owner is the logged-in user
//     await newListing.save();

//     req.flash("success", "New Listing Created");
//     res.redirect("/listings");
//   } catch (error) {
//     next(error); // Pass the error to the error-handling middleware
//   }
// };

module.exports.createListing = async (req, res, next) => { 

      
  let newListing = new Listing(req.body.listing); // ei line tir dara post request a asa data notun Listing(model) er data te convert hoy...
  newListing.owner = req.user._id;
   await newListing.save();    
  req.flash("success", "new listing created!");
  res.redirect('/listings')

}

module.exports.renderEditForm = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      return res.redirect("/listings");
    }

    res.render("listings/edit.ejs", { listing });
  } catch (error) {
    req.flash("error", "Error retrieving listing for editing.");
    res.redirect("/listings");
  }
};

module.exports.updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.body.listing) {
      req.flash("error", "Listing data is required.");
      return res.redirect(`/listings/${id}/edit`);
    }

    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  } catch (error) {
    req.flash("error", "Error updating listing.");
    res.redirect(`/listings/${id}/edit`);
  }
};

module.exports.destroyListing = async (req, res) => {
  try {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
  } catch (error) {
    req.flash("error", "Error deleting listing.");
    res.redirect("/listings");
  }
};