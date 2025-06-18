const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const cors = require('cors');


app.use(cors());
require('dotenv').config();

const supplyRoutes = require('./routes/Supply.Route');
const rateRoutes = require('./routes/Rate.Route');
const sellerRoute = require('./routes/Seller.Route')

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/supplyDB')
      .then(() => console.log('Connected to MongoDB'))
      .catch(err => console.error(err));

// Routes
app.use('/api/v0.1/Supply', supplyRoutes);
app.use('/api/v0.1', rateRoutes);
app.use('/api/v0.1', sellerRoute);

app.use((err, req, res, next) => {
      console.error(err.stack);
      const { status = 500, message = "Something went wrong!" } = err;
      res.status(status).json({ status, message, error: err.message });
});

app.listen(port, () => {
      console.log(`Server running on port ${port}`);
});
