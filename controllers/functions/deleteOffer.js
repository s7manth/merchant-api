const offer = require('../../models/offerModel');

const deleteOffer = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                msg: 'Unique Offer Identifier not Provided'
            });
        }

        await offer.findByIdAndDelete(id);

        return res.status(200).json({
            msg: "Offer Deleted"
        })

    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
}

module.exports = deleteOffer;
