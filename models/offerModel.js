const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    issuerMerchant: {
        type: mongoose.Types.ObjectId,
        ref: 'merchant'
    },
    description: {
        type: String,
        required: [true, 'Please enter a valid description for the offer'],
        trim: true
    },
    title: {
        type: String,
        required: [true, 'Please enter a title for the offer'],
        trim: true
    },
    image: {
        type: String,
        default: ''
    },
    discount: {
        type: Number,
        required: [true, 'Please enter the discount percentage']
    }
});

module.exports = mongoose.model('offer', offerSchema);
