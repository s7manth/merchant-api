const merchant = require('../../models/merchantModel');
const offer = require('../../models/offerModel');

const getOffersByMerchant = async (req, res) => {
    try {
        const { merchantId } = req.body;

        if (!merchantId) {
            res.status(400).json({
                msg: 'Merchant Identifier not Provided'
            });
        }

        const merchantObject = await merchant.findById(merchantId);

        if (!merchantObject) {
            res.status(400).json({
                msg: 'Merchant Identifier Invalid'
            });
        }

        const os = await offer.find({
            _id: {
                $in: merchantObject.offers
            }
        });

        return res.status(200).json({
            offers: os
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
};

module.exports = getOffersByMerchant;
