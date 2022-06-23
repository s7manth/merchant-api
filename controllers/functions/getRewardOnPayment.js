const merchant = require('../../models/merchantModel');
const user = require('../../models/userModel')
const payment = require('../../models/paymentModel');
const reward = require('../../models/rewardModel')

const mongoose = require('mongoose');

const getRewardOnPayment = async (req, res) => {
    try {
        const { userId, paymentId, merchantId } = req.body;

        if (!userId || !paymentId || !merchantId) {
            return res.status(400).json({
                msg: "User, Payment, or Merchant Identifier not Provided"
            })
        }

        const paymentObject = await payment.findById(paymentId);
        const merchantObject = await merchant.findById(merchantId);
        const userObject = await user.findById(userId);

        if (!userObject || !paymentObject || !merchantObject) {
            return res.status(400).json({
                msg: "User, Payment, or Merchant Identifier Invalid"
            })
        }

        let isVerificationSuccessful = false;

        if (userObject.payments.indexOf(paymentObject) !== -1 
            && merchantObject.payments.indexOf(paymentObject) !== -1
            && paymentObject.sender._id.toString() === userId 
            && paymentObject.receiver._id.toString() === merchantId) {
                isVerificationSuccessful = true;
        }

        if (!isVerificationSuccessful) {
            res.status(400).json({
                msg: "Request Invalid, Verification Unsuccessful"
            })
        }

        const _id = new mongoose.Types.ObjectId();

        const rewardObject = new reward({
            _id: _id,
            title: process.env.PAYMENT_REWARD_TITLE,
            description: process.env.PAYMENT_REWARD_DESCRIPTION,
            issuerMerchant: merchantObject
        });

        await rewardObject.save();

        await merchant.findByIdAndUpdate(merchantId, {
            rewards: [...merchantObject.rewards, rewardObject]
        })
        
        await user.findByIdAndUpdate(userId, {
            rewards: [...userObject.rewards, rewardObject]
        })

        return res.status(200).json({
            msg: "Reward based on Payment Generated",
            reward: rewardObject
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

module.exports = getRewardOnPayment;
