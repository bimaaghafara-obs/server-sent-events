import React, { useState } from 'react';

function Feeds() {
  const [feeds, setFeeds] = useState<{
    id: number;
    desc: string
  }[]>([]);

  const getFeeds = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/feeds?pageSize=20');
      const data = await res.json();
      setFeeds(data.data);
      console.log(data)
    } catch (error) {
      console.error({ error });
    }
  }

	React.useEffect(() => {
    // get initial feeds
		getFeeds();

    // opening a connection to the server to begin receiving new feeds from it
    const eventSource = new EventSource("http://localhost:5000/api/feeds/stream");
    
    // attaching a handler to receive message events
    eventSource.onmessage = (event) => {
      const newFeed = JSON.parse(event.data);
      setFeeds((prev) => [newFeed, ...prev]);
    };
    
    // terminating the connection on component unmount
    return () => eventSource.close();
  }, []);

	React.useEffect(() => {
    const audio = new Audio('/notification.mp3');
    setTimeout(() => {
    audio.play().then(() => {
      console.log({ audio });
    }).catch((error) => {
      console.log({ error });
    });
  }, 3000)
    // Clean up the audio element when the component unmounts
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
	}, [feeds])


  return (
    <div style={{ padding: '16px 32px' }}>
      <h3>Feeds</h3>
      {feeds.slice(0, 25).map((feed) => (
        <div key={feed.id}>
          {feed.desc}
        </div>
      ))}
      {feeds.length ? <div>...</div> : null}
    </div>
  );
}

export default Feeds;
