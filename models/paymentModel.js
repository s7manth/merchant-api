const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('payment', paymentSchema);
