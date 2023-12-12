import React, { useState } from 'react';

function Feeds() {
  const [feeds, setFeeds] = useState<{
    id: number;
    desc: string
  }[]>([]);

  const getFeeds = async () => {
    const res = await fetch('http://localhost:5000/api/feeds');
    const data = await res.json();
    setFeeds(data);
  }

	React.useEffect(() => {
		getFeeds();
	}, [])


  return (
    <div style={{ padding: '20px' }}>
      {feeds.map((feed) => (
        <div key={feed.id}>
          {feed.desc}
        </div>
      ))}
    </div>
  );
}

export default Feeds;
