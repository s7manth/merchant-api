const mongoose = require('mongoose');
const offer = require('../../models/offerModel');
const merchant = require('../../models/merchantModel');

const createOffer = async (req, res) => {
    try {
        const { issuerMerchantId, description, title, discount, userOwner } = req.body;

        const merchantObject = await merchant.findById(issuerMerchantId);

        if (!merchantObject) {
            return res.status(400).json({
                msg: 'Merchant Identifier Invalid'
            });
        }

        if (!description) {
            return res.status(400).json({
                msg: 'Description Needed'
            });
        }

        if (!title) {
            return res.status(400).json({
                msg: 'Title Needed'
            });
        }

        if (!discount) {
            return res.status(400).json({
                msg: 'Discount Needed'
            });
        }

        const _id = mongoose.Types.ObjectId();

        const offerObject = new offer({
            _id: _id,
            title: title,
            description: description,
            discount: discount,
            issuerMerchant: merchantObject,
            image: process.env.OFFER_IMAGE,
            userOwner: userOwner
        });

        await offerObject.save();

        await merchant.findByIdAndUpdate(issuerMerchantId, {
            offers: [...merchantObject.offers, offerObject]
        });

        return res.status(200).json({
            msg: 'New Offer Created',
            id: _id
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
};

module.exports = createOffer;
