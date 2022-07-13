const merchant = require('../../models/merchantModel');
const user = require('../../models/userModel');
const payment = require('../../models/paymentModel');
const offer = require('../../models/offerModel');

const mongoose = require('mongoose');

const getOfferOnPayment = async (req, res) => {
    try {
        const { userId, paymentId, merchantId } = req.body;

        if (!userId || !paymentId || !merchantId) {
            return res.status(400).json({
                msg: 'User, Payment, or Merchant Identifier not Provided'
            });
        }

        const paymentObject = await payment.findById(paymentId);
        const merchantObject = await merchant.findById(merchantId);
        const userObject = await user.findById(userId);

        if (!userObject || !paymentObject || !merchantObject) {
            return res.status(400).json({
                msg: 'User, Payment, or Merchant Identifier Invalid'
            });
        }

        let isVerificationSuccessful = false;

        if (
            userObject.payments.indexOf(paymentObject._id.toString()) !== -1 &&
            merchantObject.payments.indexOf(paymentObject._id.toString()) !== -1 &&
            paymentObject.sender._id.toString() === userId.toString() &&
            paymentObject.receiver._id.toString() === merchantId.toString()
        ) {
            isVerificationSuccessful = true;
        }

        if (!isVerificationSuccessful) {
            res.status(400).json({
                msg: 'Request Invalid, Verification Unsuccessful'
            });
        }

        const _id = new mongoose.Types.ObjectId();

        const offerObject = new offer({
            _id: _id,
            title: process.env.PAYMENT_OFFER_TITLE,
            description: process.env.PAYMENT_OFFER_DESCRIPTION,
            discount: process.env.PAYMENT_OFFER_DISCOUNT,
            issuerMerchant: merchantObject
        });

        await offerObject.save();

        await merchant.findByIdAndUpdate(merchantId, {
            offers: [...merchantObject.offers, offerObject]
        });

        await user.findByIdAndUpdate(userId, {
            offers: [...userObject.offers, offerObject]
        });

        return res.status(200).json({
            msg: 'Offer based on Payment Generated',
            offer: offerObject
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
};

module.exports = getOfferOnPayment;
