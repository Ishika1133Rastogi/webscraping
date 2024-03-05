import React, { useState } from 'react';
import axios from 'axios';
import './form.css';


const ProgressBar = ({ activeFieldset }) => (
  <ul id="progressbar">
    <li className={activeFieldset === 1 ? 'active' : ''}>URL EXTRACTION</li>
    <li className={activeFieldset === 2 ? 'active' : ''}>SCRAPING</li>
    <li className={activeFieldset === 3 ? 'active' : ''}>EXTRACTED DATA</li>
  </ul>
);

const Fieldset = ({ title, subtitle, children, style }) => (
  <fieldset style={style}>
    <h2 className="fs-title">{title}</h2>
    <h3 className="fs-subtitle">{subtitle}</h3>
    {children}
  </fieldset>
);

const App = () => {
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState([]);
  const [activeFieldset, setActiveFieldset] = useState(1);
  
  const downloadPDF = async () => {
    try {
      const response = await fetch('http://localhost:5000/generate-pdf');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'data.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  const handleNext = () => {
    setActiveFieldset((prevActiveFieldset) => prevActiveFieldset + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const response = await axios.post('http://localhost:5000/scrape', { url });
      setUrls(response.data.urls || []);
    } catch (error) {
      console.error('Error scraping URL:', error);
    }
  }
    return (
    <div>
      <form id="msform" onSubmit={handleSubmit}>
        <ProgressBar activeFieldset={activeFieldset} />
        <Fieldset style={{ display: activeFieldset === 1 ? 'block' : 'none' }}>
          <h2 class="fs-title">Provide the Main URL</h2>
          <h3 class="fs-subtitle">This step will provide the list of all URLs</h3>
          <input
            type="text"
            name="email"
            value={url}
            placeholder="Main URL"
            onChange={(e) => setUrl(e.target.value)}
          />
                   
            <button type="button" className="download action-button" onClick={downloadPDF}>
              Download
            </button>
            <button type="submit" className="previous action-button">
            Submit
          </button>
            <button type="button" className="next action-button" onClick={handleNext}>
            Next
          </button>
        </Fieldset>
    
        
      </form>
    </div>
  );
};

export default App;


