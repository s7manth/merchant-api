const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        default: 'default merchant name'
    },
    configOfferTitle: {
        type: String,
        trim: true
    },
    configOfferDiscount: {
        type: String,
        trim: true
    },
    configOfferDescription: {
        type: String,
        trim: true
    },
    configRewardTitle: {
        type: String,
        trim: true
    },
    configRewardAmount: {
        type: String,
        trim: true
    },
    configRewardDescription: {
        type: String,
        trim: true
    },
    configOfferImage: {
        type: String,
        trim: true
    },
    configRewardImage: {
        type: String,
        trim: true
    },
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
