const getRewardsByMerchant = require('./functions/getRewardsByMerchant');
const getOffersByMerchant = require('./functions/getOffersByMerchant');

const getRewardsByUser = require('./functions/getRewardsByUser');
const getOffersByUser = require('./functions/getOffersByUser');

const getRewardOnPayment = require('./functions/getRewardOnPayment');
const getOfferOnPayment = require('./functions/getOfferOnPayment');

const logicController = {
    getRewardsByMerchant: getRewardsByMerchant,
    getOffersByMerchant: getOffersByMerchant,
    getRewardOnPayment: getRewardOnPayment,
    getOfferOnPayment: getOfferOnPayment,
    getRewardsByUser: getRewardsByUser,
    getOffersByUser: getOffersByUser
};

module.exports = logicController;
