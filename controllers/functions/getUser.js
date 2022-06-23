const user = require('../../models/userModel');

const getUser = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                msg: 'Unique User Identifier not Provided'
            });
        }

        const userObject = await user.findById(id);

        if (!userObject) {
            return res.status(400).json({
                msg: 'Such User Does Not Exist'
            });
        }

        return res.status(200).json(userObject);
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
};

module.exports = getUser;
