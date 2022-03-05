const express = require('express');

const router = express.Router();

//middleware
const { authCheck,adminCheck  } = require('../middlewares/auth')

// controller
const { createOrUpdateuser, currentUser } = require("../controllers/auth");

router.post("/create-or-update-user",authCheck, createOrUpdateuser);
router.post("/current-user",authCheck, currentUser);
router.post("/current-admin",authCheck,adminCheck, currentUser);

module.exports = router;