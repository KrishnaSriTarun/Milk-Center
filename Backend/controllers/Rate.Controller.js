const Rate = require('../models/Rate');

exports.addRate = async (req, res) => {
      console.log(req.body);
      const { rate,specialRate } = req.body;
      const newRate = new Rate({ rate ,specialRate});
      await newRate.save();
      res.status(201).json(newRate);
};

exports.updateRate = async (req, res) => {
      const { id } = req.params;
      const { rate,specialRate } = req.body;
      const updatedRate = await Rate.findByIdAndUpdate(id, { rate,specialRate, updatedAt: Date.now() }, { new: true });
      res.status(200).json(updatedRate);
};

exports.getRates = async (req, res) => {
      const rates = await Rate.findOne();
      res.status(200).json(rates);
};
