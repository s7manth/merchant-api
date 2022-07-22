const reward = require('../../models/rewardModel');

const getReward = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                _id: '<id-of-the-user>',
                issuerMerchant: 'Merchant1',
                description: 'default reward',
                title: 'default reward',
                image: 'test-image'
            });
        }

        const rewardObject = await reward.findById(id);

        if (!rewardObject) {
            return res.status(400).json({
                msg: 'Such Reward Does Not Exist'
            });
        }

        return res.status(200).json(rewardObject);
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
};

module.exports = getReward;
