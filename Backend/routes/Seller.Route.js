const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const SellerControllers= require("../controllers/Seller.Controller");
const { registerSellerMiddleware, loginValidation, authMiddleware } = require('../middleware');

router.post("/register",registerSellerMiddleware,wrapAsync(SellerControllers.register))
router.post("/login",loginValidation,wrapAsync(SellerControllers.login));
router.get("/user",authMiddleware,wrapAsync(SellerControllers.usersData));

module.exports = router;