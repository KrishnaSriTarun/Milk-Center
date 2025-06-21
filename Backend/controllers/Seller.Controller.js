const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Seller = require("../models/Seller");

exports.register = async (req, res) => {
      const { sellerId, name, PhoneNumber, role, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newSeller = new Seller({ sellerId, name, PhoneNumber, role, password: hashedPassword });
      await newSeller.save();
      res.status(201).json(newSeller);
}

exports.login = async (req, res) => {
      const { PhoneNumber, password } = req.body;
      const seller = await Seller.findOne({ PhoneNumber });
      if (!seller) return res.status(400).json({ message: "Seller not found" });
      const isMatch = await bcrypt.compare(password, seller.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
      const token = jwt.sign({ id: seller.sellerId, role: seller.role,name: seller.name },process.env.JWT_SECRET,{ expiresIn: "2d" });
      res.status(200).json({token,role: seller.role});
};

exports.usersData = async (req, res) => {
      const sellerData = await Seller.find({}, 'name PhoneNumber role sellerId');
      const sellerIds = await Seller.distinct('sellerId');
      res.status(200).json({ sellerData, sellerIds });
}
