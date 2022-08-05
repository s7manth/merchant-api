const createUser = require('./functions/createUser');
const getUser = require('./functions/getUser');
const deleteUser = require('./functions/deleteUser');

const createMerchant = require('./functions/createMerchant');
const getMerchant = require('./functions/getMerchant');
const deleteMerchant = require('./functions/deleteMerchant');
const updateMerchant = require('./functions/updateMerchant');

const createOffer = require('./functions/createOffer');
const getOffer = require('./functions/getOffer');
const updateOffer = require('./functions/updateOffer');
const deleteOffer = require('./functions/deleteOffer');

const createReward = require('./functions/createReward');
const getReward = require('./functions/getReward');
const updateReward = require('./functions/updateReward');
const deleteReward = require('./functions/deleteReward');

const createPayment = require('./functions/createPayment');
const getPayment = require('./functions/getPayment');

const dataController = {
    createUser: createUser,
    getUser: getUser,
    deleteUser: deleteUser,
    createMerchant: createMerchant,
    getMerchant: getMerchant,
    deleteMerchant: deleteMerchant,
    updateMerchant, updateMerchant,
    createOffer: createOffer,
    getOffer: getOffer,
    updateOffer: updateOffer,
    deleteOffer: deleteOffer,
    createReward: createReward,
    getReward: getReward,
    updateReward: updateReward,
    deleteReward: deleteReward,
    createPayment: createPayment,
    getPayment: getPayment
};

module.exports = dataController;
