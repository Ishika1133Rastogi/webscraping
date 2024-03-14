import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [urls, setUrls] = useState([]);
  
  useEffect(() => {
    const fetchUrls = async () => {
      const result = await axios.get('http://localhost:5002/urls');
      setUrls(result.data);
    };
    fetchUrls();
  }, []);

  const handleCheckboxChange = async (id, isChecked) => {
    await axios.put(`http://localhost:5002/urls/${id}`, { isChecked: !isChecked });
    setUrls(urls.map(url => (url._id === id ? { ...url, isChecked: !isChecked } : url)));
  };

  return (
    <div>
      <h1>URLs</h1>
      {urls.map(url => (
        <div key={url._id}>
          <input
            type="checkbox"
            checked={url.isChecked}
            onChange={() => handleCheckboxChange(url._id, url.isChecked)}
          />
          <span>{url.url}</span>
        </div>
      ))}
    </div>
  );
};

export default App;
