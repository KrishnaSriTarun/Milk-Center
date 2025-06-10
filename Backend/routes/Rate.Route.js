const express = require('express');
const router = express.Router();
const rateController = require('../controllers/Rate.Controller');
const  wrapAsync  = require('../utils/wrapAsync'); 
const { validateAddRate, validateUpdateRate } = require('../middleware');

router.get('/getRate', wrapAsync(rateController.getRates));
router.post('/addRate', validateAddRate, wrapAsync(rateController.addRate));
router.put('/updateRate/:id', validateUpdateRate, wrapAsync(rateController.updateRate));

module.exports = router;
