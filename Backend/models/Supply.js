const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplySchema = new Schema({
      sellerId: {
            type: Number,
            required: true
      },
      quantity:{
            type: Number,
            required: true
      },
      fat:{
            type: Number,
            required: true
      },
      rate:{
            type: Number,
            required: true
      },
      amount:{
            type: Number,
            required: true
      },
            status: {
            type: String,
            enum: ['Pending', 'Completed'],
            required: true
      },

      createAt:{
            type: Date,
            default: Date.now
      }
});
const Supply = mongoose.model('Supply', supplySchema);
module.exports = Supply;