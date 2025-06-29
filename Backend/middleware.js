const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const Seller = require("./models/Seller");
const jwt = require("jsonwebtoken");


module.exports.validateAddSupply = (req, res, next) => {
      const { sellerId, quantity, fat } = req.body;
      if (sellerId === undefined || quantity === undefined || fat === undefined) {
            return res.status(400).json({ error: 'sellerId, quantity, and fat are required' });
      }
      if (typeof sellerId !== 'number' || typeof quantity !== 'number' || typeof fat !== 'number') {
            return res.status(400).json({ error: 'sellerId, quantity, and fat must be numbers' });
      }
      if (quantity <= 0 || fat <= 0) {
            return res.status(400).json({ error: 'quantity and fat must be greater than 0' });
      }
      next();
};

module.exports.validateSellerIdQuery = (req, res, next) => {
      const { sellerId } = req.query;
      if (!sellerId) {
            return res.status(400).json({ error: 'sellerId is required in query' });
      }
      if (isNaN(sellerId)) {
            return res.status(400).json({ error: 'sellerId must be a number' });
      }
      next();
};

module.exports.validateAddRate = (req, res, next) => {
      const { rate, specialRate } = req.body;
      if (rate === undefined) {
            return res.status(400).json({ error: 'rate is required' });
      }
      if (specialRate === undefined) {
            return res.status(400).json({ error: 'specialRate  is required' });
      }
      if (typeof rate !== 'number') {
            return res.status(400).json({ error: 'rate must be a number' });
      }
      if (rate <= 0) {
            return res.status(400).json({ error: 'rate must be greater than 0' });
      }
      if (typeof specialRate !== 'number') {
            return res.status(400).json({ error: 'specialRate must be a number' });
      }
      if (specialRate <= 0) {
            return res.status(400).json({ error: 'specialRate must be greater than 0' });
      }
      next();
};

module.exports.validateUpdateRate = (req, res, next) => {
      const { rate } = req.body;
      const { id } = req.params;
      if (!id) {
            return res.status(400).json({ error: 'Rate ID is required in params' });
      }
      if (!rate && rate !== 0) {
            return res.status(400).json({ error: 'rate is required in body' });
      }
      if (typeof rate !== 'number') {
            return res.status(400).json({ error: 'rate must be a number' });
      }
      if (rate <= 0) {
            return res.status(400).json({ error: 'rate must be greater than 0' });
      }
      next();
};

module.exports.validateMongoIdParam = (req, res, next) => {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid MongoDB ObjectId format' });
      }

      next();
};

module.exports.validateDateRangeQuery = (req, res, next) => {
      const { sellerId, from, to } = req.query;
      if (!sellerId || !from || !to) {
            return res.status(400).json({ error: 'sellerId, from, and to are required query parameters.' });
      }
      if (isNaN(sellerId)) {
            return res.status(400).json({ error: 'sellerId must be a number.' });
      }
      const fromDate = new Date(from);
      const toDate = new Date(to);
      if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
            return res.status(400).json({ error: 'Invalid from or to date.' });
      }
      next();
};

module.exports.validateMarkCompletedBody = (req, res, next) => {
      const { sellerId, from, to } = req.body;
      if (!sellerId || !from || !to) {
            return res.status(400).json({ error: 'sellerId, from, and to are required.' });
      }
      next();
};

module.exports.registerSellerMiddleware = async (req, res, next) => {
      const { sellerId, name, PhoneNumber, role, password } = req.body;
      if (!sellerId || !name || !PhoneNumber || !role || !password) {
            return res.status(400).json({ message: "All fields are required" });
      }
      const existingSeller = await Seller.findOne({ PhoneNumber });
      if (existingSeller) {
            return res.status(409).json({ message: "Seller with this phone number already exists" });
      }
      next();
};

module.exports.loginValidation = async (req, res, next) => {
      const { PhoneNumber, password } = req.body;
      if (!PhoneNumber || !password) {
            return res.status(400).json({ message: "Phone number and password are required" });
      }
      next();
};

module.exports.authMiddleware = (req, res, next) => {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access denied. No token provided." });
      }
      const token = authHeader.split(" ")[1];
      try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
      } catch (err) {
            return res.status(401).json(err.message);
      }
};

module.exports.authorizeRoles = (...allowedRoles) => {
      return (req, res, next) => {
            if (!req.user || !allowedRoles.includes(req.user.role)) {
                  return res.status(403).json({ message: "Forbidden: Access denied." });
            }
            next();
      };
};


