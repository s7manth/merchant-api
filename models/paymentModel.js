const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    billAmount: {
        type: Number,
        required: true
    },
    paymentAmount: {
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
    attachmentOne: {
        type: mongoose.Types.ObjectId,
        required: false,
        refType: 'attachmentModelOne'
    },
    attachmentModelOne: {
        type: String,
        required: false,
        enum: ['offer', 'reward']
    },
    attachmentTwo: {
        type: mongoose.Types.ObjectId,
        required: false,
        refType: 'attachmentModelTwo'
    },
    attachmentModelTwo: {
        type: String,
        required: false,
        enum: ['offer', 'reward']
    }
});

module.exports = mongoose.model('payment', paymentSchema);
