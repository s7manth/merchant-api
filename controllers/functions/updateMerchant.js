const merchant = require('../../models/merchantModel');

const updateMerchant = async (req, res) => {
    try {
        const { id, name, configOfferTitle, configOfferDiscount, configOfferDescription, configRewardTitle, configRewardAmount, configRewardDescription, configRewardImage, configOfferImage } =
            req.body;

        const originalMerchantObject = await merchant.findById(id);

        if (!originalMerchantObject) {
            return res.status(400).json({
                msg: 'Unique Merchant Identifier Invalid'
            });
        }

        await offer.findByIdAndUpdate(id, {
            name: name || originalMerchantObject.name,
            configOfferTitle: configOfferTitle || originalMerchantObject.configOfferTitle,
            configOfferDiscount: configOfferDiscount || originalMerchantObject.configOfferDiscount,
            configOfferDescription: configOfferDescription || originalMerchantObject.configOfferDescription,
            configRewardTitle: configRewardTitle || originalMerchantObject.configRewardTitle,
            configRewardAmount: configRewardAmount || originalMerchantObject.configRewardAmount,
            configRewardDescription: configRewardDescription || originalMerchantObject.configRewardDescription,
            configOfferImage: configOfferImage || originalMerchantObject.configOfferImage,
            configRewardImage: configRewardImage || originalMerchantObject.configRewardImage
        });

        return res.status(200).json({
            msg: 'Merchant Updated'
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
};

module.exports = updateMerchant;
