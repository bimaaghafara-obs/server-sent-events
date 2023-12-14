let feeds = [];

// get all feeds
const getFeeds = async (req, res) => {
  const pageSize = req.query.pageSize ?? 10;
  res.status(200).json({
    data: feeds.slice(0, pageSize),
    total: feeds.length
  })
}

// stream new feeds
const streamFeeds = async (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-cache",
    Connection: "keep-alive", // allowing TCP connection to remain open for multiple HTTP requests/responses
    "Content-Type": "text/event-stream", // media type for Server Sent Events (SSE)
  });
  res.flushHeaders();

  const interval = setInterval(() => {
    const newFeed = {
      id: feeds.length + 1,
      desc: `feed-${feeds.length + 1}`
    };
    feeds.unshift(newFeed);
    res.write(`data: ${JSON.stringify(newFeed)}\n\n`);
  }, 5000);

  res.on("close", () => {
    clearInterval(interval);
    res.end();
  });
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
  streamFeeds,
  // getFeed,
  // createFeed,
  // deleteFeed,
  // updateFeed
}