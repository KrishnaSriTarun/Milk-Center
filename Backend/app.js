require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());

const supplyRoutes = require('./routes/Supply.Route');
const rateRoutes = require('./routes/Rate.Route');
const sellerRoute = require('./routes/Seller.Route')

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
      .then(() => console.log('Connected to MongoDB'))
      .catch(err => console.error(err));

// Routes
app.use('/api/v0.1/Supply', supplyRoutes);
app.use('/api/v0.1', rateRoutes);
app.use('/api/v0.1', sellerRoute);

app.get('/', (req, res) => {
      res.send('✅ Milk Center API is running!');
});


app.use((err, req, res, next) => {
      console.error(err.stack);
      const { status = 500, message = "Something went wrong!" } = err;
      res.status(status).json({ status, message, error: err.message });
});


app.listen(PORT, () => {
      console.log(`Server running locally on http://localhost:${PORT}`);
});

