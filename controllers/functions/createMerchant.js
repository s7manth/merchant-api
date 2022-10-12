const mongoose = require('mongoose');
const merchant = require('../../models/merchantModel');

const createMerchant = async (req, res) => {
    try {
        const {
            name,
            configOfferTitle,
            configOfferDiscount,
            configOfferDescription,
            configRewardTitle,
            configRewardAmount,
            configRewardDescription,
            configRewardImage,
            configOfferImage
        } = req.body;

        const _id = mongoose.Types.ObjectId();
        const merchantObject = new merchant({
            _id: _id,
            name: name,
            configOfferTitle:
                configOfferTitle || process.env.DEFAULT_CONFIG_OFFER_TITLE,
            configOfferDiscount:
                configOfferDiscount ||
                process.env.DEFAULT_CONFIG_OFFER_DISCOUNT,
            configOfferDescription:
                configOfferDescription ||
                process.env.DEFAULT_CONFIG_OFFER_DESCRIPTION,
            configRewardTitle:
                configRewardTitle || process.env.DEFAULT_CONFIG_REWARD_TITLE,
            configRewardAmount:
                configRewardAmount || process.env.DEFAULT_CONFIG_REWARD_AMOUNT,
            configRewardDescription:
                configRewardDescription ||
                process.env.DEFAULT_CONFIG_REWARD_DESCRIPTION,
            configOfferImage:
                configOfferImage || process.env.DEFAULT_CONFIG_OFFER_IMAGE,
            configRewardImage:
                configRewardImage || process.env.DEFAULT_CONFIG_REWARD_IMAGE
        });

        await merchantObject.save();

        return res.status(200).json({
            msg: 'New Merchant Created',
            name: name,
            id: _id
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
};

module.exports = createMerchant;
