const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    sender: {
        type: mongoose.Types.ObjectId,
        required: true,
        refPath: 'senderEntityModel'
    },
    receiver: {
        type: mongoose.Types.ObjectId,
        required: true,
        refPath: 'receiverEntityModel'
    },
    senderEntityModel: {
        type: String,
        required: true,
        enum: ['user', 'merchant']
    },
    receiverEntityModel: {
        type: String,
        required: true,
        enum: ['user', 'merchant']
    },
    attachment: {
        type: mongoose.Types.ObjectId,
        required: false,
        refType: 'attachmentModel'
    },
    attachmentModel: {
        type: String,
        required: true,
        enum: ['offer', 'reward']
    }
});

module.exports = mongoose.model('payment', paymentSchema);
