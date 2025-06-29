const express = require('express');
const router = express.Router();
const supplyController = require('../controllers/Supply.Controller');
const { validateAddSupply, validateSellerIdQuery, validateMongoIdParam, validateDateRangeQuery, validateMarkCompletedBody, authMiddleware, authorizeRoles} = require('../middleware');
const wrapAsync= require('../utils/wrapAsync')

router.get('/',authMiddleware,authorizeRoles("ROLE_ADMIN"), wrapAsync(supplyController.getAllSupplies));
router.post('/add', validateAddSupply,authMiddleware,authorizeRoles("ROLE_ADMIN"), wrapAsync(supplyController.addSupply));
router.post('/addSpecial', validateAddSupply,authMiddleware,authorizeRoles("ROLE_ADMIN"), wrapAsync(supplyController.addSpecialSupply));
router.get('/byUser', authMiddleware,authorizeRoles("ROLE_SELLER","ROLE_ADMIN"), wrapAsync(supplyController.getSupplyByUser));  //think after 
router.get('/Range',validateDateRangeQuery,authMiddleware,authorizeRoles("ROLE_ADMIN"), wrapAsync(supplyController.getSuppliesByDateRange));
router.delete('/:id',validateMongoIdParam,authMiddleware,authorizeRoles("ROLE_ADMIN"), wrapAsync(supplyController.deleteSupply));
router.put('/markCompleted', validateMarkCompletedBody,authMiddleware,authorizeRoles("ROLE_ADMIN"), wrapAsync(supplyController.markSuppliesCompleted));


module.exports = router;
