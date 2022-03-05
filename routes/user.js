const express = require("express");

const router = express.Router();

const { authCheck } = require("../middlewares/auth"); 

// controller
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCoupon,
  createOrder,
  getUserOrders,
  addToWishlist,
  wishlist,
  removeFromWishlist,
  createCashOrder,
} = require("../controllers/user");

router.post("/user/cart", authCheck, userCart); /// save cart
router.get('/user/cart', authCheck, getUserCart)
router.delete('/user/cart', authCheck, emptyCart)
router.post('/user/address', authCheck, saveAddress)

//order

router.post('/user/order', authCheck, createOrder)
router.post('/user/cash-order', authCheck, createCashOrder)
router.get('/user/orders', authCheck, getUserOrders)

//coupon
router.post('/user/cart/coupon', authCheck, applyCoupon)

// wishlist
router.post('/user/wishlist', authCheck, addToWishlist)
router.get('/user/wishlist', authCheck, wishlist)
router.put('/user/wishlist/:productId', authCheck, removeFromWishlist)

// router.get("/user", (req, res) => {
//   res.json({
//     data: "welcome you hit user API ENDPOINT",
//   });
// });
 
module.exports = router;
