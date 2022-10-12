const user = require('../../models/userModel');
const offer = require('../../models/offerModel');
const reward = require('../../models/rewardModel');

const getUser = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                _id: '<id-of-the-user>',
                offers: [],
                rewards: [],
                payments: []
            });
        }

        const userObject = await user.findById(id);

        if (!userObject) {
            return res.status(400).json({
                msg: 'Such User Does Not Exist'
            });
        }

        const os = await offer.find({
            _id: {
                $in: userObject.offers
            }
        });

        const rs = await reward.find({
            _id: {
                $in: userObject.rewards
            }
        });

        let offerDict = {};
        for (let i = 0; i < os.length; ++i) {
            if (os[i].issuerMerchant in offerDict) {
                offerDict[os[i].issuerMerchant].append(os[i]);
            } else {
                offerDict[os[i].issuerMerchant] = [os[i]];
            }
        }

        let rewardDict = {};
        for (let i = 0; i < rs.length; ++i) {
            if (rs[i].issuerMerchant in rewardDict) {
                rewardDict[rs[i].issuerMerchant].append(rs[i]);
            } else {
                rewardDict[rs[i].issuerMerchant] = [rs[i]];
            }
        }

        for (let k in rewardDict) {
            rewardDict[k] = rewardDict[k]
                .map((x) => x.value)
                .reduce((sum, number) => sum + number, 0);
        }

        return res.status(200).json({
            _id: userObject._id,
            offers: offerDict,
            rewards: rewardDict,
            payments: userObject.payments
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
};

module.exports = getUser;
