const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({
    rewards: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'reward'
        }
    ],
    offers: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'offer'
        }
    ],
    payments: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'payment'
        }
    ]
});

module.exports = mongoose.model('merchant', merchantSchema);
