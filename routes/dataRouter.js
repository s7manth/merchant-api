const express = require('express');
const dataController = require('../controllers/dataController');

const router = express.Router();

router.post('/user', dataController.createUser);
router.get('/user', data.dataController.getUser);
router.patch('/user', dataController.updateUser);
router.delete('/user', dataController.deleteUser);

router.post('/merchant', dataController.createMerchant);
router.get('/merchant', data.dataController.getMerchant);
router.patch('/merchant', dataController.updateMerchant);
router.delete('/merchant', dataController.deleteMerchant);

router.post('/offer', dataController.createOffer);
router.get('/offer', data.dataController.getOffer);
router.patch('/offer', dataController.updateOffer);
router.delete('/offer', dataController.deleteOffer);

router.post('/reward', dataController.createReward);
router.get('/reward', data.dataController.getReward);
router.patch('/reward', dataController.updateReward);
router.delete('/reward', dataController.deleteReward);

router.post('/payment', dataController.createPayment);
router.get('/payment', data.dataController.getPayment);
router.patch('/payment', dataController.updatePayment);
router.delete('/payment', dataController.deletePayment);

module.exports = router;
