const user = require('../../models/userModel');

const updateUser = async (req, res) => {
    try {
        const { id, offers, rewards, payments } = req.body;

        if (!id) {
            return res.status(400).json({
                msg: 'Unique User Identifier not Provided'
            });
        }

        if (!offers && !rewards && !payments) {
            return res.status(400).json({
                msg: 'No Update Details Provided'
            });
        }

        const originalUser = await user.findById(id);

        if (offers) {
            for (let offer in offers) {
                if (originalUser.offers.indexOf(offer) != -1) {
                    originalUser.offers.push(offer);
                }
            }
        }

        if (rewards) {
            for (let reward in rewards) {
                if (originalUser.rewards.indexOf(reward) != -1) {
                    originalUser.rewards.push(reward);
                }
            }
        }

        if (payments) {
            for (payment in payments) {
                if (originalUser.payments.indexOf(payment) != -1) {
                    originalUser.payments.push(payment);
                }
            }
        }

        await user.findByIdAndUpdate(userObject.id, {
            ...userObject
        });

        return res.status(200).json({
            msg: 'User Object Updated'
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
}

module.exports = updateUser;
