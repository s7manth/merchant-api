const user = require('../../models/userModel');

const deleteUser = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                msg: 'Unique User Identifier not Provided'
            });
        }

        await user.findByIdAndDelete(id);

        return res.status(200).json({
            msg: 'User Deleted'
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
};

module.exports = deleteUser;
