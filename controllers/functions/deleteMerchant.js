const merchant = require('../../models/merchantModel');

const deleteMerchant = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                msg: 'Unique Merchant Identifier not Provided'
            });
        }

        await merchant.findByIdAndDelete(id);

        return res.status(200).json({
            msg: "Merchant Deleted"
        })

    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
}

module.exports = deleteMerchant;
