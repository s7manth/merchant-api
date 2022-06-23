const reward = require('../../models/rewardModel');

const deleteReward = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                msg: 'Unique Reward Identifier not Provided'
            });
        }

        await reward.findByIdAndDelete(id);

        return res.status(200).json({
            msg: 'Reward Deleted'
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
};

module.exports = deleteReward;
