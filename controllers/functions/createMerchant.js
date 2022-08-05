const mongoose = require('mongoose');
const merchant = require('../../models/merchantModel');

const createMerchant = async (req, res) => {
    try {
        const { name } = req.body;

        const _id = mongoose.Types.ObjectId();
        const merchantObject = new merchant({
            _id: _id,
            name: name
        });

        await merchantObject.save();

        return res.status(200).json({
            msg: 'New Merchant Created',
            name: name,
            id: _id
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
};

module.exports = createMerchant;
