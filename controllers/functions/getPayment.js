const mongoose = require('mongoose');
const payment = require('../../models/paymentModel');

const getPayment = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                msg: 'Unique Payment Identifier not Provided'
            });
        }

        const paymentObject = await payment.findById(id);

        if (!paymentObject) {
            return res.status(400).json({
                msg: 'Such Payment Does Not Exist'
            });
        }

        return res.status(200).json(paymentObject);
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
};

module.exports = getPayment;
