const user = require('../../models/userModel');
const reward = require('../../models/rewardModel');

const getRewardsByUser = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            res.status(400).json({
                msg: 'User Identifier not Provided'
            });
        }

        const userObject = await user.findById(userId);

        if (!userObject) {
            res.status(400).json({
                msg: 'User Identifier Invalid'
            });
        }

        const rs = await reward.find({
            _id: {
                $in: userObject.rewards
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

module.exports = getRewardsByUser;
