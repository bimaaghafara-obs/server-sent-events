const feeds = [{
  id: 1,
  desc: 'feed-1'
}, {
  id: 2,
  desc: 'feed-2'
}];

// get all feeds
const getFeeds = async (req, res) => {
  res.status(200).json(feeds)
}

// get a single feed
// const getFeed = async (req, res) => {}

// create a new feed
// const createFeed = async (req, res) => {}

// delete a feed
// const deleteFeed = async (req, res) => {}

// update a feed
// const updateFeed = async (req, res) => {}

module.exports = {
  getFeeds,
  // getFeed,
  // createFeed,
  // deleteFeed,
  // updateFeed
}