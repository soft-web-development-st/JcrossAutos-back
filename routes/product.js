const express = require("express");

const router = express.Router();

//middleware
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  create,
  listAll,
  remove,
  read,
  update,
  list,
  listTwo,
  totalProduct,
  productStar,
  relatedProduct,
  searchfilters,
} = require("../controllers/product");

router.post("/product", authCheck, adminCheck, create);
router.get("/products/total", totalProduct);
router.get("/products/:count", listAll); 
router.delete('/product/:slug', authCheck,adminCheck, remove)
router.get('/product/:slug',read)
router.put('/product/:slug', authCheck, adminCheck, update)

router.post('/products', list)
router.post('/products', listTwo)

//rating
router.put('/product/star/:productId', authCheck, productStar)

// related
router.get("/product/related/productId", relatedProduct);

// search 

router.post('/search/filters', searchfilters)
module.exports = router;
