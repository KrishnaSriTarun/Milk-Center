const mongoose = require('mongoose');

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
      const { rate,specialRate } = req.body;
      if (rate === undefined) {
            return res.status(400).json({ error: 'rate is required' });
      }
      if (specialRate  === undefined) {
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

