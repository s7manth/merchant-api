const mongoose = require('mongoose');
const merchant = require('../../models/merchantModel');

const createMerchant = async (req, res) => {
    try {
        const _id = mongoose.Types.ObjectId();
        const merchantObject = new merchant({
            _id: _id
        });

        await merchantObject.save();

        return res.status(200).json({
            msg: 'New Merchant Created',
            id: _id
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
};

module.exports = createMerchant;
