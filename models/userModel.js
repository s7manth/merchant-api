const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    ]
});

module.exports = mongoose.model('user', userSchema);
