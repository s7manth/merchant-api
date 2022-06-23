const user = require('../../models/userModel');

const getOffersByUser = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            res.status(400).json({
                msg: "User Identifier not Provided"
            })
        }

        const userObject = await user.findById(userId);

        if (!userObject) {
            res.status(400).json({
                msg: "User Identifier Invalid"
            })
        }

        return res.status(200).json({
            offers: userObject.offers
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
}

module.exports = getOffersByUser;
