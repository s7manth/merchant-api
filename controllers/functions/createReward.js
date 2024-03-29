const mongoose = require('mongoose');
const reward = require('../../models/rewardModel');
const merchant = require('../../models/merchantModel');

const createReward = async (req, res) => {
    try {
        const { issuerMerchantId, description, title, userOwner } = req.body;

        const merchantObject = await merchant.findById(issuerMerchantId);

        if (!merchantObject) {
            return res.status(400).json({
                msg: 'Merchant Identifier Invalid'
            });
        }

        if (!description) {
            return res.status(400).json({
                msg: 'Description Needed'
            });
        }

        if (!title) {
            return res.status(400).json({
                msg: 'Title Needed'
            });
        }

        const _id = mongoose.Types.ObjectId();

        const rewardObject = new reward({
            _id: _id,
            title: title,
            description: description,
            issuerMerchant: merchantObject,
            image: process.env.REWARD_IMAGE,
            userOwner: userOwner
        });

        await rewardObject.save();

        await merchant.findByIdAndUpdate(issuerMerchantId, {
            rewards: [...merchantObject.rewards, rewardObject]
        });

        return res.status(200).json({
            msg: 'New Reward Created',
            id: _id
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
};

module.exports = createReward;
