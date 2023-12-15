const express = require('express')
const {
  getTransactions,
  streamTransactions,
  createTransaction,
  // getTransaction,
  // deleteTransaction,
  // updateTransaction
} = require('../controllers/transactionsController')

const router = express.Router()

// GET all transactions
router.get('/', getTransactions)

// Stream new transactions
router.get('/stream', streamTransactions)

// POST a new transaction
router.post('/', createTransaction)

// GET a single transaction
// router.get('/:id', getTransaction)

// DELETE a transaction
// router.delete('/:id', deleteTransaction)

// UPDATE a transaction
// router.patch('/:id', updateTransaction)

module.exports = router