const express = require("express");

const router = express.Router();

//middleware
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const { create, remove, list } = require("../controllers/coupon");

router.post("/coupon", authCheck, adminCheck, create);
router.get("/coupon", list);
router.delete("/coupon/:couponId", authCheck, adminCheck, remove);

module.exports = router;
 