const offer = require('../../models/offerModel');

const getOffer = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                msg: 'Unique Offer Identifier not Provided'
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
