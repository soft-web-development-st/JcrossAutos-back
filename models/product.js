const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 150,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      text: true,
      index: true,
    },
    description: {
      type: String,
      maxlength: 10000,
      text: true,
      required: true,
    },
    price: {
      type: Number,
      maxlength: 200,
      trim: true,
      maxlength: 32,
      required: true,
    },
    category: [
      {
        type: ObjectId,
        ref: "Category",
      },
    ],
    subs: [
      {
        type: ObjectId,
        ref: "Sub",
      },
    ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
    color: {
      type: String,
      enum: ["Black", "Brown", "Gray", "White", "Blue", "Red"],
    },

    brand: {
      type: String,
      enum: ["Tesla", "BMW", "Toyota", "Honda", "Ford"],
    },
    ratings: [
      {
        star: Number,
        postedBy: { type: ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);