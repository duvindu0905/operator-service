const express = require('express');
const router = express.Router();
const operatorController = require('../controllers/operatorController');  // Import operator controller

// 1) Create a new operator
router.post('/operators', operatorController.createOperator);

// 2) Get all operators
router.get('/operators', operatorController.getAllOperators);

// 3) Get a single operator by operatorId
router.get('/operators/:operatorId', operatorController.getOperatorById);

// 4) Update an operator by operatorId
router.put('/operators/:operatorId', operatorController.updateOperator);

// 5) Delete an operator by operatorId
router.delete('/operators/:operatorId', operatorController.deleteOperator);

module.exports = router;
