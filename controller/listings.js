const Listing = require("../models/listing.js");
const { geocode } = require("../public/js/graphHopper.js");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.searchResult = async (req, res) => {
  let { q } = req.query;
  if (!q) {
    res.redirect("/listing");
  }
  const results = await Listing.find({
    $or: [
      { location: { $regex: q, $options: "i" } },
      { country: { $regex: q, $options: "i" } },
      { title: { $regex: q, $options: "i" } },
    ],
  });
  if (results.length === 0) {
    req.flash("error", `No listing exists for '${q}'`);
    return res.redirect("/listing");
  }
  res.render("listings/search.ejs", { results, query: q });
};

module.exports.showParticularListing = async (req, res) => {
  let { id } = req.params;
  const particularListing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!particularListing) {
    req.flash("error", "Listing that you requested does not exist");
    res.redirect("/listing");
  }
  res.render("listings/show.ejs", { particularListing });
};

module.exports.createListing = async (req, res, next) => {
  /* let { title, description, price, location, imageURL } = req.body; */
  let formData = req.body.listing;
  formData.categories = [
    ...new Set(formData.categories.filter((category) => category !== "")),
  ];
  const newListing = new Listing(formData);
  newListing.owner = req.user._id;
  newListing.image = { url: req.file.path, filename: req.file.filename };
  let location = formData.location;
  let country = formData.country;
  let data = await geocode(location, country);
  if (data.hits && data.hits.length > 0) {
    const { point } = data.hits[0];
    const { lat, lng } = point;
    //saving this is geoJSON format
    newListing.geometry = { type: "Point", coordinates: [lng, lat] };
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listing");
  } else {
    req.flash(
      "error",
      "Wrong Location/Country, Please enter a valid location "
    );
    res.redirect("/listing/new");
  }
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const particularListing = await Listing.findById(id);
  if (!particularListing) {
    req.flash("error", "Listing that you requested does not exist");
    res.redirect("/listing");
  }
  let originalImageUrl = particularListing.image.url;
  let editUrl = originalImageUrl.replace("/upload", "/upload/h_250");
  res.render("listings/edit.ejs", { particularListing, editUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let formData = req.body.listing;

  // Validate location
  let location = formData.location;
  let country = formData.country;
  let data = await geocode(location, country);

  if (data.hits && data.hits.length > 0) {
    const { point } = data.hits[0];
    const { lat, lng } = point;
    formData.geometry = { type: "Point", coordinates: [lng, lat] };

    // Update listing with new data
    let updatedListing = await Listing.findByIdAndUpdate(
      id,
      {
        ...formData,
      },
      { new: true } //ensures that updatedListing contains the updated document with all the new field values, rather than the old document before the update.
    );
    if (typeof req.file !== "undefined") {
      let url = req.file.path;
      let filename = req.file.filename;
      updatedListing.image = { url, filename };
      await updatedListing.save();
    }
    req.flash("success", "Listing Updated");
    res.redirect(`/listing/${id}`);
  } else {
    req.flash(
      "error",
      "Wrong Location/Country, Please enter a valid location "
    );
    res.redirect(`/listing/${id}/edit`);
  }
};

module.exports.destroyParticularListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing deleted");
  res.redirect("/listing");
};
