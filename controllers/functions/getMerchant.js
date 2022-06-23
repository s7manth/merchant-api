const merchant = require('../../models/merchantModel');

const getMerchant = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                msg: 'Unique Merchant Identifier not Provided'
            });
        }

        const merchantObject = await merchant.findById(id);

        if (!merchantObject) {
            return res.status(400).json({
                msg: 'Such Merchant Does Not Exist'
            });
        }

        return res.status(200).json(merchantObject);
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
};

module.exports = getMerchant;
