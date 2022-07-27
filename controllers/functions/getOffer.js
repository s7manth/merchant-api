const offer = require('../../models/offerModel');

const getOffer = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(200).json({
                _id: '<id-of-the-user>',
                issuerMerchant: 'Merchant1',
                description: 'default offer',
                title: 'default offer',
                image: 'https://res.cloudinary.com/cbandi-001/image/upload/v1658656581/merchant-api-assets/offer_zpbvcd.jpg',
                discount: 10
            });
        }

        const offerObject = await offer.findById(id);

        if (!offerObject) {
            return res.status(400).json({
                msg: 'Such Offer Does Not Exist'
            });
        }

        return res.status(200).json(offerObject);
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
};

module.exports = getOffer;
