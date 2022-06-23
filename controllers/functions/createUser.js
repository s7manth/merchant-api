const mongoose = require('mongoose');
const user = require('../../models/userModel');

const createUser = async (req, res) => {
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
};

module.exports = createUser;
