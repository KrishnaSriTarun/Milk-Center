const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const SellerControllers= require("../controllers/Seller.Controller");
const { registerSellerMiddleware, loginValidation } = require('../middleware');

router.post("/register",registerSellerMiddleware,wrapAsync(SellerControllers.register))
router.post("/login",loginValidation,wrapAsync(SellerControllers.login));


module.exports = router;