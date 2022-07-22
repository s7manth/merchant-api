const user = require('../../models/userModel');
const offer = require('../../models/offerModel');

const getOffersByUser = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            res.status(400).json({
                msg: 'User Identifier not Provided'
            });
        }

        const userObject = await user.findById(userId);

        if (!userObject) {
            res.status(400).json({
                msg: 'User Identifier Invalid'
            });
        }

        const os = await offer.find({
            _id: {
                $in: userObject.offers
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

module.exports = getOffersByUser;
