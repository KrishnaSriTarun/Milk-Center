const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const SellerControllers= require("../controllers/Seller.Controller");
const { registerSellerMiddleware, loginValidation, authMiddleware, authorizeRoles } = require('../middleware');

router.post("/register",authMiddleware,authorizeRoles("ROLE_ADMIN"),registerSellerMiddleware,wrapAsync(SellerControllers.register))
router.post("/login",loginValidation,wrapAsync(SellerControllers.login));
router.get("/user",authMiddleware,authorizeRoles("ROLE_ADMIN"),wrapAsync(SellerControllers.usersData));

module.exports = router;