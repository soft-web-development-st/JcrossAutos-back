const User = require("../models/auth");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Coupon = require("../models/coupon");
const stripe = require("stripe")(process.env.STRIPE_SECRET);


exports.createPaymentIntent = async (req, res) => {
   
   const {couponApplied} = req.body 
    // find user
    const user = await User.findOne({ email: req.user.email }).exec();
    // get user cart total
    const { cartTotal, totalAfterDiscount } = await Cart.findOne({
      orderedBy: user._id,
    }).exec();
    // console.log('cartTotal', cartTotal, 'total afterdiscount', totalAfterDiscount);
    // return
    // create paument intent with other amount n currency

    let finalAmount = 0;

    if (couponApplied && totalAfterDiscount) {
        finalAmount = Math.round(totalAfterDiscount * 100)
    } else {
        finalAmount = (cartTotal * 100)
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: finalAmount,
        currency: 'usd',
    })
    res.send({
        client_secret: paymentIntent.client_secret,
        cartTotal,
        totalAfterDiscount,
        payable:finalAmount,
    })
    console.log('client_secret---->',paymentIntent.client_secret);
}