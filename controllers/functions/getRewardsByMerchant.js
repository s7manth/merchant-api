const merchant = require('../../models/merchantModel');
const reward = require('../../models/rewardModel');

const getRewardsByMerchant = async (req, res) => {
    try {
        const { merchantId } = req.body;

        if (!merchantId) {
            res.status(400).json({
                msg: 'Merchant Identifier not Provided'
            });
        }

        const merchantObject = await merchant.findById(merchantId);

        if (!merchantObject) {
            res.status(400).json({
                msg: 'Merchant Identifier Invalid'
            });
        }

        const rs = await reward.find({
            _id: {
                $in: merchantObject.rewards
            }
        });

        return res.status(200).json({
            rewards: rs
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
};

module.exports = getRewardsByMerchant;
