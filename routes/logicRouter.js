const express = require('express');
const logicController = require('../controllers/logicController');

const router = express.Router();

router.get('/get-offers-by-merchant', logicController.getOffersByMerchant);
router.get('/get-rewards-by-merchant', logicController.getRewardsByMerchant);

router.get('/get-offers-by-user', logicController.getOffersByUser);
router.get('/get-rewards-by-user', logicController.getRewardsByUser);

router.get('/get-reward-on-payment', logicController.getRewardOnPayment);
router.get('/get-offer-on-payment', logicController.getOfferOnPayment);

module.exports = router;
