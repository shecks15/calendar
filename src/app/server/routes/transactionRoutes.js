const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction } = require('../controllers/transactionController');

router.get('/transactions', getTransactions);

router.post('/transactions', addTransaction);

module.exports = router;
