const createUser = require('./functions/createUser');
const getUser = require('./functions/getUser')
const updateUser = require('./functions/updateUser');
const deleteUser = require('./functions/deleteUser');

const createMerchant = require('./functions/createMerchant');
const getMerchant = require('./functions/getMerchant');
const updateMerchant = require('./functions/updateMerchant');
const deleteMerchant = require('./functions/deleteMerchant');

const createOffer = require('./functions/createOffer');
const getOffer = require('./functions/getOffer');
const updateOffer = require('./functions/updateOffer');
const deleteOffer = require('./functions/deleteOffer');

const createReward = require('./functions/createReward');
const getReward = require('./functions/getReward');
const updateReward = require('./functions/updateReward');
const deleteReward = require('./functions/deleteReward');

const dataController = {
    createUser: createUser,
    getUser: getUser,
    updateUser: updateUser,
    deleteUser: deleteUser, 
    createMerchant: createMerchant,
    getMerchant: getMerchant,
    updateMerchant: updateMerchant,
    deleteMerchant: deleteMerchant,
    createOffer: createOffer,
    getOffer: getOffer,
    updateOffer: updateOffer,
    deleteOffer: deleteOffer, 
    createReward: createReward,
    getReward: getReward,
    updateReward: updateReward,
    deleteReward: deleteReward
};

module.exports = dataController;
