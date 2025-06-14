const Supply = require('../models/Supply');
const Rate = require('../models/Rate');

exports.addSupply = async (req, res) => {
      console.log(req.body);
      const { sellerId, quantity, fat, status } = req.body;
      const [latestRate] = await Rate.find().sort({ createdAt: -1 }).limit(1);
      const amount = Math.floor(fat * latestRate.rate * quantity);
      const supply = new Supply({ sellerId, quantity, fat, rate: latestRate.rate, amount, status });
      await supply.save();
      res.status(201).json(supply);
};


exports.getAllSupplies = async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalSupplies = await Supply.countDocuments();
      const totalPages = Math.ceil(totalSupplies / limit);
      const supplies = await Supply.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
      const distinctUserIds = await Supply.distinct('sellerId');
      res.status(200).json({ currentPage: page, totalPages, totalSupplies, supplies, distinctUserIds });
};

exports.getSupplyByUser = async (req, res) => {   //Rethink
      const { sellerId } = req.query;
      const tenDaysAgo = new Date();
      tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
      const supplies = await Supply.find({
            sellerId: Number(sellerId),
            createAt: { $gte: tenDaysAgo }
      });
      const totalAmount = supplies.reduce((sum, s) => sum + s.amount, 0).toFixed(2);
      res.status(200).json({ totalAmount, supplies });
};

exports.getSuppliesByDateRange = async (req, res) => {
      const { sellerId, from, to } = req.query;
      const fromDate = new Date(from);
      const toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999);
      const supplies = await Supply.find({
            sellerId: sellerId,
            createAt: { $gte: fromDate, $lte: toDate }
      });
      const totalAmount = supplies.reduce((sum, s) => sum + s.amount, 0).toFixed(2);
      res.status(200).json({ totalAmount, supplies });
};

exports.deleteSupply = async (req, res) => {
      const { id } = req.params;
      await Supply.findByIdAndDelete(id);
      res.status(204).json("deleted")
}

exports.markSuppliesCompleted = async (req, res) => {
      const { sellerId, from, to } = req.body;
      const fromDate = new Date(from);
      const toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999);
      const filter = {
            sellerId,
            createAt: { $gte: fromDate, $lte: toDate },
            status: 'Pending'
      };
      const result = await Supply.updateMany(filter, { $set: { status: 'Completed' } });
      res.status(200).json({ message: `${result.modifiedCount} supplies marked as Completed.` });
};

