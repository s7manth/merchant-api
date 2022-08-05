const router = require('express').Router();
const scrapeController = require('../controllers/scrapeController');

router.post('/square', scrapeController.scrapeSquare);

module.exports = router;
