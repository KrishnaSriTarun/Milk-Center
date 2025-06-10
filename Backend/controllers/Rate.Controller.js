const Rate = require('../models/Rate');

exports.addRate = async (req, res) => {
      const { rate } = req.body;
      const newRate = new Rate({ rate });
      await newRate.save();
      res.status(201).json(newRate);
};

exports.updateRate = async (req, res) => {
      const { id } = req.params;
      const { rate } = req.body;
      const updatedRate = await Rate.findByIdAndUpdate(id, { rate, updatedAt: Date.now() }, { new: true });
      res.status(200).json(updatedRate);
};

exports.getRates = async (req, res) => {
      const rates = await Rate.findOne();
      res.status(200).json(rates);
};
