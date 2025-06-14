const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rateSchema = new Schema({
      rate: {
            type: Number,
            required: true
      },
      specialRate:{
            type: Number,
            required: true
      }
}, {
      timestamps: true
});

const Rate = mongoose.model('Rate', rateSchema);
module.exports = Rate;
