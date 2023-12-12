const express = require('express')
const {
  getFeeds, 
//   getFeed, 
//   createFeed, 
//   deleteFeed, 
//   updateFeed
} = require('../controllers/feedController')

const router = express.Router()

// GET all feeds
router.get('/', getFeeds)

// GET a single feed
// router.get('/:id', getFeed)

// POST a new feed
// router.post('/', createFeed)

// DELETE a feed
// router.delete('/:id', deleteFeed)

// UPDATE a feed
// router.patch('/:id', updateFeed)

module.exports = router