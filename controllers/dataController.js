const user = require('../models/userModel');
const merchant = require('../models/merchantModel');
const offer = require('../models/offerModel');
const reward = require('../models/rewardModel');
const payment = require('../models/paymentModel');
const mongoose = require('mongoose');

const dataController = {
    createUser: async (req, res) => {
        try {
            const _id = mongoose.Types.ObjectId();
            const userObject = new user({
                _id: _id
            });

            await userObject.save();

            return res.status(200).json({
                msg: 'New User Created',
                id: _id
            });
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            });
        }
    },
    getUser: async (req, res) => {
        try {
            const { id } = req.body;

            const userObject = await user.findById(id);

            return res.status(200).json(userObject);
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            });
        }
    },
    updateUser: async (req, res) => {
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
    },
    deleteUser: async (req, res) => {
        try {
            const { id } = req.body;

            if (!id) {
                return res.status(400).json({
                    msg: 'Unique User Identifier not Provided'
                });
            }

            await user.findByIdAndDelete(id);

            return res.status(200).json({
                msg: "User Deleted"
            })

        } catch (error) {
            return res.status(500).json({
                msg: error.message
            });
        }
    }
};

module.exports = dataController;
