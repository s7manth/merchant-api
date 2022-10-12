const mongoose = require('mongoose');
const user = require('../../models/userModel');
const merchant = require('../../models/merchantModel');
const payment = require('../../models/paymentModel');
const offer = require('../../models/offerModel');
const reward = require('../../models/rewardModel');

const createPayment = async (req, res) => {
    try {
        const {
            billAmount,
            paymentAmount,
            senderId,
            receiverId,
            attachmentIdOne,
            attachmentIdTwo
        } = req.body;

        if (!billAmount || !paymentAmount || !senderId || !receiverId) {
            return res.status(400).json({
                msg: 'Incomplete Information for Payment'
            });
        }

        if (billAmount < 0 || paymentAmount < 0) {
            return res.status(400).json({
                msg: 'Amount cannot be Negative or Zero'
            });
        }

        const senderWrapper = await figureOutMerchantOrUser(senderId);
        const receiverWrapper = await figureOutMerchantOrUser(receiverId);

        if (senderWrapper === null || receiverWrapper === null) {
            return res.status(400).json({
                msg: 'Sender or Receiver Unique Identifier Invalid'
            });
        }

        const attachmentWrapperOne = await figureOutAttachment(attachmentIdOne);
        const attachmentWrapperTwo = await figureOutAttachment(attachmentIdTwo);

        const _id = mongoose.Types.ObjectId();
        const paymentObject = new payment({
            _id: _id,
            sender: senderWrapper.object,
            receiver: receiverWrapper.object,
            senderEntityModel: senderWrapper.type,
            receiverEntityModel: receiverWrapper.type,
            billAmount: billAmount,
            paymentAmount: paymentAmount,
            attachmentOne:
                attachmentWrapperOne === null
                    ? undefined
                    : attachmentWrapperOne.object,
            attachmentModelOne:
                attachmentWrapperOne === null
                    ? undefined
                    : attachmentWrapperOne.type,
            attachmentTwo:
                attachmentWrapperTwo === null
                    ? undefined
                    : attachmentWrapperTwo.object,
            attachmentModelTwo:
                attachmentWrapperTwo === null
                    ? undefined
                    : attachmentWrapperTwo.type
        });

        await paymentObject.save();

        if (billAmount != paymentAmount) {
            if (attachmentWrapperOne != null) {
                if (attachmentWrapperOne.type == 'reward') {
                    let updatedRewardList = [
                        ...senderWrapper.object.rewards
                    ].filter((x) => x != attachmentWrapperOne.object._id);
                    if (senderWrapper.type === 'user') {
                        await user.findByIdAndUpdate(senderId, {
                            payments: [
                                ...senderWrapper.object.payments,
                                paymentObject
                            ],
                            rewards: updatedRewardList
                        });
                    } else {
                        await merchant.findByIdAndUpdate(senderId, {
                            payments: [
                                ...senderWrapper.object.payments,
                                paymentObject
                            ],
                            rewards: updatedRewardList
                        });
                    }
                } else {
                    let updatedOfferList = [
                        ...senderWrapper.object.offer
                    ].filter((x) => x != attachmentWrapperOne.object._id);
                    if (receiverWrapper.type === 'user') {
                        await user.findByIdAndUpdate(receiverId, {
                            payments: [
                                ...receiverWrapper.object.payments,
                                paymentObject
                            ],
                            offers: updatedOfferList
                        });
                    } else {
                        await merchant.findByIdAndUpdate(receiverId, {
                            payments: [
                                ...receiverWrapper.object.payments,
                                paymentObject
                            ],
                            offers: updatedOfferList
                        });
                    }
                }
            }

            if (attachmentWrapperTwo != null) {
                if (attachmentWrapperTwo.type == 'reward') {
                    let updatedRewardList = [
                        ...senderWrapper.object.rewards
                    ].filter((x) => x != attachmentWrapperTwo.object._id);
                    if (senderWrapper.type === 'user') {
                        await user.findByIdAndUpdate(senderId, {
                            payments: [
                                ...senderWrapper.object.payments,
                                paymentObject
                            ],
                            rewards: updatedRewardList
                        });
                    } else {
                        await merchant.findByIdAndUpdate(senderId, {
                            payments: [
                                ...senderWrapper.object.payments,
                                paymentObject
                            ],
                            rewards: updatedRewardList
                        });
                    }
                } else {
                    let updatedOfferList = [
                        ...senderWrapper.object.offer
                    ].filter((x) => x != attachmentWrapperTwo.object._id);
                    if (receiverWrapper.type === 'user') {
                        await user.findByIdAndUpdate(receiverId, {
                            payments: [
                                ...receiverWrapper.object.payments,
                                paymentObject
                            ],
                            offers: updatedOfferList
                        });
                    } else {
                        await merchant.findByIdAndUpdate(receiverId, {
                            payments: [
                                ...receiverWrapper.object.payments,
                                paymentObject
                            ],
                            offers: updatedOfferList
                        });
                    }
                }
            }
        }

        return res.status(200).json({
            msg: 'New Payment Created',
            id: _id
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
};

const figureOutMerchantOrUser = async (id) => {
    let type = undefined;
    let object = await merchant.findById(id);

    if (!object) {
        object = await user.findById(id);
        type = 'user';
    } else {
        type = 'merchant';
    }

    if (!object) {
        return null;
    } else {
        return {
            object: object,
            type: type
        };
    }
};

const figureOutAttachment = async (id) => {
    let type = undefined;
    let object = await offer.findById(id);

    if (!object) {
        object = await reward.findById(id);
        type = 'reward';
    } else {
        type = 'offer';
    }

    if (!object) {
        return null;
    } else {
        return {
            object: object,
            type: type
        };
    }
};

module.exports = createPayment;
