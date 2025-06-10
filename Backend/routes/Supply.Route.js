const express = require('express');
const router = express.Router();
const supplyController = require('../controllers/Supply.Controller');
const { validateAddSupply, validateSellerIdQuery, validateMongoIdParam, validateDateRangeQuery} = require('../middleware');
const wrapAsync= require('../utils/wrapAsync')

router.get('/', wrapAsync(supplyController.getAllSupplies));
router.post('/add', validateAddSupply, wrapAsync(supplyController.addSupply));
router.get('/byUser', validateSellerIdQuery, wrapAsync(supplyController.getSupplyByUser));  //think after 
router.get('/Range',validateDateRangeQuery, wrapAsync(supplyController.getSuppliesByDateRange));
router.delete('/:id',validateMongoIdParam, wrapAsync(supplyController.deleteSupply));

module.exports = router;
