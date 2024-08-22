const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controller/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//INDEX and CREATE Route
router
  .route("/")
  //index
  .get(wrapAsync(listingController.index))
  //create
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

//NEW route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//SEARCH route
router.get("/search", wrapAsync(listingController.searchResult));

//SHOW, UPDATE, and DELETE Route
router
  .route("/:id")
  .get(
    //show
    wrapAsync(listingController.showParticularListing)
  )
  .put(
    //update
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    //destroy
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyParticularListing)
  );

//EDIT Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
