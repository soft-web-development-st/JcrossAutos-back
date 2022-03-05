const Sub = require("../models/sub");
const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res, next) => {
  try {
    const { name,parent } = req.body;
    const sub = await new Sub({ name, parent,slug: slugify(name) }).save();
    res.json(sub);
  } catch (error) {
    console.log('SUB CONSOLE-------> ', error);
    res.status(400).send("Failed to create sub-category");
  }
};
 
exports.list = async (req, res, next) => {
  res.json(await Sub.find({}).sort({ createdAt: -1 }).exec());
};

exports.read = async (req, res, next) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({subs:sub}).populate('category').exec()
  res.json({
    sub, 
    products
  });
};

exports.update = async (req, res, next) => {
  const { name,parent } = req.body;
  try {
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent,slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).send("Failed to update sub-category");
  }
};

exports.remove = async (req, res, next) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (error) {
    res.status(400).send("Failed to delete sub-category");
  }
};
