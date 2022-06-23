const offer = require('../../models/offerModel');
const merchant = require('../../models/merchantModel');

const updateOffer = async (req, res) => {
    try {
        const { id, description, issuerMerchantId, title, image, discount } =
            req.body;

        const originalOfferObject = await offer.findById(id);

        if (!originalOfferObject) {
            return res.status(400).json({
                msg: 'Unique Offer Identifier Invalid'
            });
        }

        await offer.findByIdAndUpdate(id, {
            description: description || originalOfferObject.description,
            title: title || originalOfferObject.title,
            image: image || originalOfferObject.image,
            discount: discount || originalOfferObject.discount
        });

        if (
            issuerMerchantId !==
            originalOfferObject.issuerMerchant._id.toString()
        ) {
            const mObject = await merchant.findById(issuerMerchantId);
            if (!mObject) {
                return res.status(400).json({
                    msg: 'Merchant Unique Identifier Invalid'
                });
            } else {
                await offer.findByIdAndUpdate(id, {
                    issuerMerchant: mObject
                });

                const updatedOfferObject = await offer.findById(id);
                await merchant.findByIdAndUpdate(issuerMerchantId, {
                    offers: [...mObject.offers, updatedOfferObject]
                });

                let m = await merchant.findById(
                    originalOfferObject.issuerMerchant._id
                );
                m.offers.filter(
                    (o) =>
                        o._id.toString() !== originalOfferObject._id.toString()
                );

                await merchant.findByIdAndUpdate(
                    originalOfferObject.issuerMerchant._id,
                    {
                        offers: m.offers
                    }
                );
            }
        }

        return res.status(200).json({
            msg: 'Offer Updated'
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
};

module.exports = updateOffer;
