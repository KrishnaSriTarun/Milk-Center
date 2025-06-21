const express = require('express');
const router = express.Router();
const supplyController = require('../controllers/Supply.Controller');
const { validateAddSupply, validateSellerIdQuery, validateMongoIdParam, validateDateRangeQuery, validateMarkCompletedBody, authMiddleware} = require('../middleware');
const wrapAsync= require('../utils/wrapAsync')

router.get('/',authMiddleware, wrapAsync(supplyController.getAllSupplies));
router.post('/add', validateAddSupply,authMiddleware, wrapAsync(supplyController.addSupply));
router.post('/addSpecial', validateAddSupply,authMiddleware, wrapAsync(supplyController.addSpecialSupply));
router.get('/byUser', authMiddleware, wrapAsync(supplyController.getSupplyByUser));  //think after 
router.get('/Range',validateDateRangeQuery,authMiddleware, wrapAsync(supplyController.getSuppliesByDateRange));
router.delete('/:id',validateMongoIdParam,authMiddleware, wrapAsync(supplyController.deleteSupply));
router.put('/markCompleted', validateMarkCompletedBody,authMiddleware, wrapAsync(supplyController.markSuppliesCompleted));


module.exports = router;
