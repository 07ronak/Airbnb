const Joi = require("joi"); //schema description language and data validator for JavaScript.

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: {
      url: Joi.string().allow("", null),
      filename: Joi.string().allow("", null),
    },
    categories: Joi.array()
      .items(
        Joi.string().valid(
          "Trending",
          "Rooms",
          "Beach",
          "Camping",
          "Iconic Cities",
          "Beachfront",
          "Bed&Breakfasts",
          "Castles",
          "Ski-in/out",
          "Amazing pools",
          ""
        )
      )
      .default([]),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});
