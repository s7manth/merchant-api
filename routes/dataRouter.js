const express = require('express');
const dataController = require('../controllers/dataController');

const router = express.Router();

router.post('/user', dataController.createUser);
router.get('/user', dataController.getUser);
router.delete('/user', dataController.deleteUser);

router.post('/merchant', dataController.createMerchant);
router.get('/merchant', dataController.getMerchant);
router.delete('/merchant', dataController.deleteMerchant);

router.post('/offer', dataController.createOffer);
router.get('/offer', dataController.getOffer);
router.patch('/offer', dataController.updateOffer);
router.delete('/offer', dataController.deleteOffer);

router.post('/reward', dataController.createReward);
router.get('/reward', dataController.getReward);
router.patch('/reward', dataController.updateReward);
router.delete('/reward', dataController.deleteReward);

router.post('/payment', dataController.createPayment);
router.get('/payment', dataController.getPayment);

module.exports = router;
