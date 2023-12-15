import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react';

const notificationAudio = new Audio('/notification.mp3');

function Transactions() {
  const [lastUpdateTransaction, setLastUpdateTransaction] = useState<number>();
  const [transactions, setTransactions] = useState<{
    id: number;
    desc: string
  }[]>([]);

  const getTransactions = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/transactions?pageSize=20');
      const data = await res.json();
      setTransactions(data.data);
      console.log(data)
    } catch (error) {
      console.error({ error });
    }
  }

	React.useEffect(() => {
    // get initial transactions
		getTransactions();

    // opening a connection to the server to begin receiving new transactions from it
    const eventSource = new EventSource("http://localhost:5000/api/transactions/stream");
    
    // attaching a handler to receive message events
    eventSource.onmessage = (event) => {
      const newTransaction = JSON.parse(event.data);
      setTransactions((prev) => [newTransaction, ...prev]);
      setLastUpdateTransaction(Date.now());
    };
    
    // terminating the connection on component unmount
    return () => eventSource.close();
  }, []);

	React.useEffect(() => {
    if (lastUpdateTransaction) {
      notificationAudio.play().then(() => {
        enqueueSnackbar('There is a new transaction that needs to be authorized.');
        console.log("New Transaction", transactions[0]);
      }).catch((error) => {
        console.log({ error });
      });
    }

    // Clean up the notificationAudio element when the component unmounts
    return () => {
      notificationAudio.pause();
      notificationAudio.currentTime = 0;
    };
	}, [lastUpdateTransaction])


  return (
    <div style={{ padding: '16px 32px' }}>
      <h3>Transactions</h3>
      {transactions.slice(0, 25).map((transaction) => (
        <div key={transaction.id}>
          {transaction.desc}
        </div>
      ))}
    </div>
  );
}

export default Transactions;
