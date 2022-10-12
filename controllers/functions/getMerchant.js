const merchant = require('../../models/merchantModel');
const offer = require('../../models/offerModel');
const reward = require('../../models/rewardModel');

const getMerchant = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                _id: '<id-of-the-merchant>',
                offers: [],
                rewards: [],
                payments: []
            });
        }

        const merchantObject = await merchant.findById(id);

        if (!merchantObject) {
            return res.status(400).json({
                msg: 'Such Merchant Does Not Exist'
            });
        }

        let offerDict = {};
        const offerObjects = await offer.find({
            _id: {
                $in: merchantObject.offers
            }
        });

        for (let o in offerObjects) {
            if (o.userOwner.toString() in offerDict) {
                offerDict[o.userOwner.toString()].append(o._id.toString());
            } else {
                offerDict[o.userOwner.toString()] = [o._id.toString()];
            }
        }

        let rewardDict = {};
        const rewardObjects = await reward.find({
            _id: {
                $in: merchantObject.rewards
            }
        });

        for (let o in rewardObjects) {
            if (o.userOwner.toString() in rewardDict) {
                rewardDict[o.userOwner.toString()].append(o._id.toString());
            } else {
                rewardDict[o.userOwner.toString()] = [o._id.toString()];
            }
        }

        for (let k in rewardDict) {
            rewardDict[k] = rewardDict[k]
                .map((x) => x.value)
                .reduce((sum, number) => sum + number, 0);
        }

        return res.status(200).json({
            _id: merchantObject._id,
            offers: offerDict,
            rewards: rewardDict,
            payments: merchantObject.payments
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
};

module.exports = getMerchant;
