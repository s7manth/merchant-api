const mongoose = require('mongoose');
const user = require('../../models/userModel');
const merchant = require('../../models/merchantModel');
const payment = require('../../models/paymentModel');
const offer = require('../../models/offerModel');
const reward = require('../../models/rewardModel');

const createPayment = async (req, res) => {
    try {
        const { amount, senderId, receiverId, attachmentId } = req.body;

        if (!amount || !sender || !receiver) {
            return res.status(400).json({
                msg: 'Incomplete Information for Payment'
            });
        }

        if (amount <= 0) {
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

        const attachmentWrapper = await figureOutAttachment(attachmentId);

        const _id = mongoose.Types.ObjectId();
        const paymentObject = new payment({
            _id: _id,
            sender: senderWrapper.object,
            receiver: receiverWrapper.object,
            senderEntityModel: senderWrapper.type,
            receiverEntityModel: receiverWrapper.type,
            amount: amount,
            attachment:
                attachmentWrapper === null
                    ? undefined
                    : attachmentWrapper.object,
            attachmentModel:
                attachmentWrapper === null ? undefined : attachmentWrapper.type
        });

        await paymentObject.save();

        if (senderWrapper.type === 'user') {
            await user.findByIdAndUpdate(senderId, {
                payments: [...senderWrapper.object.payments, paymentObject]
            });
        } else {
            await merchant.findByIdAndUpdate(senderId, {
                payments: [...senderWrapper.object.payments, paymentObject]
            });
        }

        if (receiverWrapper.type === 'user') {
            await user.findByIdAndUpdate(receiverId, {
                payments: [...receiverWrapper.object.payments, paymentObject]
            });
        } else {
            await merchant.findByIdAndUpdate(receiverId, {
                payments: [...receiverWrapper.object.payments, paymentObject]
            });
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
