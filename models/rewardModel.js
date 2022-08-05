const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
    issuerMerchant: {
        type: mongoose.Types.ObjectId,
        ref: 'merchant'
    },
    description: {
        type: String,
        required: [true, 'Please enter a valid description for the reward'],
        trim: true
    },
    title: {
        type: String,
        required: [true, 'Please enter a title for the reward'],
        trim: true
    },
    image: {
        type: String,
        default: ''
    }, 
    value: {
        type: Number,
        default: 0
    }, 
    userOwner: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    }
});

module.exports = mongoose.model('reward', rewardSchema);
