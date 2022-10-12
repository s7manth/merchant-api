const reward = require('../../models/rewardModel');
const merchant = require('../../models/merchantModel');

const updateReward = async (req, res) => {
    try {
        const { id, description, issuerMerchantId, title, image, value } =
            req.body;

        const originalRewardObject = await reward.findById(id);

        if (!originalRewardObject) {
            return res.status(400).json({
                msg: 'Unique Reward Identifier Invalid'
            });
        }

        await reward.findByIdAndUpdate(id, {
            description: description || originalRewardObject.description,
            title: title || originalRewardObject.title,
            image: image || originalRewardObject.image,
            value: value || originalRewardObject.value
        });

        if (
            issuerMerchantId !==
            originalRewardObject.issuerMerchant._id.toString()
        ) {
            const mObject = await merchant.findById(issuerMerchantId);
            if (!mObject) {
                return res.status(400).json({
                    msg: 'Merchant Unique Identifier Invalid'
                });
            } else {
                await reward.findByIdAndUpdate(id, {
                    issuerMerchant: mObject
                });

                const updatedRewardObject = await reward.findById(id);
                await merchant.findByIdAndUpdate(issuerMerchantId, {
                    offers: [...mObject.offers, updatedRewardObject]
                });

                let m = await merchant.findById(
                    originalRewardObject.issuerMerchant._id
                );
                m.rewards.filter(
                    (r) =>
                        r._id.toString() !== originalRewardObject._id.toString()
                );

                await merchant.findByIdAndUpdate(
                    originalRewardObject.issuerMerchant._id,
                    {
                        rewards: m.rewards
                    }
                );
            }
        }

        return res.status(200).json({
            msg: 'Reward Updated'
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
};

module.exports = updateReward;
