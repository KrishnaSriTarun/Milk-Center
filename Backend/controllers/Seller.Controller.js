const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Seller = require("../models/Seller");

exports.register = async (req, res) => {
      const { sellerId, name, PhoneNumber, role, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newSeller = new Seller({
            sellerId,
            name,
            PhoneNumber,
            role,
            password: hashedPassword
      });
      await newSeller.save();
      res.status(201).json(newSeller);
}

exports.login = async (req, res) => {
      const { PhoneNumber, password } = req.body;
      const seller = await Seller.findOne({ PhoneNumber });
      if (!seller) return res.status(400).json({ message: "Seller not found" });
      const isMatch = await bcrypt.compare(password, seller.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
      const token = jwt.sign({ id: seller._id, role: seller.role }, process.env.JWT_SECRET, {
            expiresIn: "7d"
      });
      res.status(200).json({ token });
};
