const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");

router.get("/Trending", async (req, res) => {
  const allListings = await Listing.find({ categories: "Trending" });
  res.render("filters/trending.ejs", { allListings });
});
router.get("/Rooms", async (req, res) => {
  const allListings = await Listing.find({ categories: "Rooms" });
  res.render("filters/rooms.ejs", { allListings });
});
router.get("/Iconic-cities", async (req, res) => {
  const allListings = await Listing.find({ categories: "Iconic Cities" });
  res.render("filters/iconicCities.ejs", { allListings });
});
router.get("/Beach", async (req, res) => {
  const allListings = await Listing.find({ categories: "Beach" });
  res.render("filters/beach.ejs", { allListings });
});
router.get("/Camping", async (req, res) => {
  const allListings = await Listing.find({ categories: "Camping" });
  res.render("filters/camping.ejs", { allListings });
});
router.get("/Beachfront", async (req, res) => {
  const allListings = await Listing.find({ categories: "Beachfront" });
  res.render("filters/beachfront.ejs", { allListings });
});
router.get("/Bed&Breakfast", async (req, res) => {
  const allListings = await Listing.find({ categories: "Bed&Breakfasts" });
  res.render("filters/bedAndBreakfasts.ejs", { allListings });
});
router.get("/castles", async (req, res) => {
  const allListings = await Listing.find({ categories: "Castles" });
  res.render("filters/castels.ejs", { allListings });
});
router.get("/ski-in-out", async (req, res) => {
  const allListings = await Listing.find({ categories: "Ski-in/out" });
  res.render("filters/ski.ejs", { allListings });
});
router.get("/amazingpools", async (req, res) => {
  const allListings = await Listing.find({ categories: "Amazing pools" });
  res.render("filters/amazingPools.ejs", { allListings });
});

module.exports = router;
