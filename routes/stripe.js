const express = require('express')
const router = express.Router()

const {createPaymentIntent  } = require('../controllers/stripe')

// midleware
const { authCheck } = require('../middlewares/auth')

router.post('/create-payment-intent', authCheck, createPaymentIntent)

module.exports = router