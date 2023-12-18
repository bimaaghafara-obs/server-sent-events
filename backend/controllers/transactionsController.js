let transactions = [];
let connectedClients = [];

// get all transactions
const getTransactions = async (req, res) => {
  const pageSize = req.query.pageSize ?? 10;
  res.status(200).json({
    data: transactions.slice(0, pageSize),
    total: transactions.length
  })
}

// stream new transactions
const streamTransactions = async (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-cache",
    Connection: "keep-alive", // allowing TCP connection to remain open for multiple HTTP requests/responses
    "Content-Type": "text/event-stream", // media type for Server Sent Events (SSE)
  });
  res.flushHeaders();

  connectedClients.push(res);

  res.on("close", () => {
    connectedClients = connectedClients.filter(client => client !== res);
  });
}

// create a new transaction
const createTransaction = async (req, res) => {
  const newTransaction = {
    id: transactions.length + 1,
    desc: `transaction-${transactions.length + 1}`
  };
  transactions.unshift(newTransaction);

  // Notify connected clients about the new transaction
  connectedClients.forEach(client => {
    client.write(`data: ${JSON.stringify(newTransaction)}\n\n`);
  });

  res.status(200).json(newTransaction);
}

// get a single transaction
// const getTransaction = async (req, res) => {}

// delete a transaction
// const deleteTransaction = async (req, res) => {}

// update a transaction
// const updateTransaction = async (req, res) => {}

module.exports = {
  getTransactions,
  streamTransactions,
  createTransaction,
  // getTransaction,
  // deleteTransaction,
  // updateTransaction
}