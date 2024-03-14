// import React, { useState,useEffect, useRef } from 'react';
// import axios from 'axios';
// import * as html2pdf from 'html2pdf.js';
// import './form.css';


// const ProgressBar = ({ activeFieldset }) => (
//   <ul id="progressbar">
//     <li className={activeFieldset === 1 ? 'active' : ''}>URL EXTRACTION</li>
//     <li className={activeFieldset === 2 ? 'active' : ''}>SCRAPING</li>
//     <li className={activeFieldset === 3 ? 'active' : ''}>EXTRACTED DATA</li>
//   </ul>
// );

// const Fieldset = ({ title, subtitle, children, style }) => (
//   <fieldset style={style}>
//     <h2 className="fs-title">{title}</h2>
//     <h3 className="fs-subtitle">{subtitle}</h3>
//     {children}
//   </fieldset>
// );

// const App = () => {
//   const [url, setUrl] = useState('');
//   const [urls, setUrls] = useState([]);
//   const [displayUrls, setDisplayUrls] = useState(false);
//   const [activeFieldset, setActiveFieldset] = useState(1);
// const [output, setOutput] = useState('');
//   const preRef = useRef(null);
//   const [formData, setFormData] = useState({
//     text2: '',
//     text3: '',
//   });
  
//   const [extractedoutput, setExtractedoutput] = useState('');
//   const [displayExtractedoutput, setDisplayExtractedoutput] = useState(false);

//     const handleDownloadPDF = () => {
//     const tempContainer = document.createElement('div');
//     tempContainer.style.display = 'none';
    
//     const element = document.querySelector('.url-container');
//     const pdfOptions = {
//       margin: 10,
//       filename: 'output.pdf',
//       // image: { type: 'jpeg', quality: 1 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
       
//     };
//     html2pdf().from(element).set(pdfOptions).save();
    
//   };
 
 
//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
 
//   const handlePrevious = () => {
//     setActiveFieldset((prevActiveFieldset) => prevActiveFieldset - 1);
//   };
//   const handleNext = () => {
//     setActiveFieldset((prevActiveFieldset) => prevActiveFieldset + 1);
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try{
//       const response = await axios.post('http://localhost:5002/scrape', { url });
//       const scrapedUrls = response.data.urls || [];
//       setUrls(scrapedUrls);   
//       setDisplayUrls(true);
//       setOutput(response.data.urls);
//     } catch (error) {
//       console.error('Error scraping URL:', error);
//     }
    
//   };
  

//     return (
//     <div>
//       <form id="msform" onSubmit={handleSubmit}>
//         <ProgressBar activeFieldset={activeFieldset} />
//         <Fieldset style={{ display: activeFieldset === 1 ? 'block' : 'none' }}>
//           <h2 className="fs-title">Provide the Main URL</h2>
//           <h3 className="fs-subtitle">This step will provide the list of all URLs</h3>
//           <input
//             type="text"
//             name="email"
//             value={url}
//             placeholder="Main URL"
//             onChange={(e) => setUrl(e.target.value)}
//           />
//             <button type="button" className="download action-button" onClick={handleDownloadPDF}>
//               Download
//             </button>
//             <button type="submit" className="previous action-button">
//             Submit
//           </button>
//             <button type="button" className="next action-button" onClick={handleNext}>
//             Next
//           </button>
      
        
//         <div title="Extracted URLs" style={{ display: 'block' }}  className="url-container">
//         <ul className="url-list">
//         {urls.map((url, index) => (
//           <li key={index} className="url-item">
//             <a href={url} target="_blank" rel="noopener noreferrer" className="url-link">{url}</a>
//           </li>
//         ))}
//       </ul>
//       </div>
//           </Fieldset>
      

//         <Fieldset style={{ display: activeFieldset === 2 ? 'block' : 'none' }}>
//           <h2 className="fs-title">SCRAPING STAGE</h2>
//           <h3 className="fs-subtitle">Enter the URL and the selector that you want to scrape</h3>
//           <input
//             type="text"
//             name="text2"
//             placeholder="Scrape this URL"
//             value={formData.text2}
//             onChange={handleInputChange}
//           />
//           <input
//           type="text"
//           name="text3"
//           placeholder="Selector"
//           value={formData.text3}
//           onChange={handleInputChange}
//         />
//           <button type="button" className="previous action-button" onClick={handlePrevious}>
//             Previous
//           </button>
//           <button type="submit" className="submit action-button">
//             Submit
//           </button>
//         </Fieldset>
 
//         {activeFieldset === 3 && (
//           <Fieldset title="Extraction Results" style={{ display: 'block' }}>
//             <button type="button" className="previous action-button" onClick={handlePrevious}>
//               Previous
//             </button>
//             {displayExtractedoutput && <pre>{extractedoutput}</pre>}
//           </Fieldset>
//         )}
    
        
//       </form>
//     </div>
//   );
// };

// export default App;

/*import React, { useState, useEffect } from "react";
import axios from "axios";
import "./form.css";
const ProgressBar = ({ activeFieldset }) => (
  <ul id="progressbar">
    <li className={activeFieldset === 1 ? "active" : ""}>URL EXTRACTION</li>
    <li className={activeFieldset === 2 ? "active" : ""}>SCRAPING</li>
    <li className={activeFieldset === 3 ? "active" : ""}>EXTRACTED DATA</li>
  </ul>
);
const Fieldset = ({ title, subtitle, children, style }) => (
  <fieldset style={style}>
    <h2 className="fs-title">{title}</h2>
    <h3 className="fs-subtitle">{subtitle}</h3>
    {children}{" "}
  </fieldset>
);
const App = () => {
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [displayUrls, setDisplayUrls] = useState(false);
  const [activeFieldset, setActiveFieldset] = useState(1);
  const [formData, setFormData] = useState({ text2: "", text3: "" });
  const [extractedContent, setExtractedContent] = useState("");
  const [displayExtractedContent, setDisplayExtractedContent] = useState(false);
  const downloadPDF = async () => {
    try {
      const response = await fetch("http://localhost:5000/generate-pdf");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data.pdf");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handlePrevious = () => {
    setActiveFieldset((prevActiveFieldset) => prevActiveFieldset - 1);
  };
  const handleNext = () => {
    setActiveFieldset((prevActiveFieldset) => prevActiveFieldset + 1);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/scrape", {
        url,
      });
      const scrapedUrls = response.data.urls || [];
      setUrls(scrapedUrls);
    } catch (error) {
      console.error("Error scraping URL:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/scrape');
        setUrls(response.data);
        setDisplayUrls(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <form id="msform" onSubmit={handleSubmit}>
        <ProgressBar activeFieldset={activeFieldset} />
        <Fieldset style={{ display: activeFieldset === 1 ? "block" : "none" }}>
          <h2 className="fs-title">Provide the Main URL</h2>
          <h3 className="fs-subtitle">
            This step will provide the list of all URLs
          </h3>
          <input
            type="text"
            name="email"
            value={url}
            placeholder="Main URL"
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            type="button"
            className="download action-button"
            onClick={downloadPDF}
          >
            Download
          </button>
          <button type="submit" className="previous action-button">
            Submit
          </button>
          <button
            type="button"
            className="next action-button"
            onClick={handleNext}
          >
         Next
          </button>
        <div title="Extracted URLs" style={{ display: 'block' }}> 
        {displayUrls && (
          <div>
          {displayUrls && (
            <div style={{ height: '200px', overflowY: 'scroll' }}>
              <ul>
                {urls.map((url, index) => (
                  <li key={index}>
                    <a href={url.url} target="_blank" rel="noopener noreferrer">
                      {url.url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        )}
        </div>
         </Fieldset>
        <Fieldset style={{ display: activeFieldset === 2 ? "block" : "none" }}>
          <h2 className="fs-title">SCRAPING STAGE</h2>
          <h3 className="fs-subtitle">
            Enter the URL and the selector that you want to scrape
          </h3>
          <input
            type="text"
            name="text2"
            placeholder="Scrape this URL"
            value={formData.text2}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="text3"
            placeholder="Selector"
            value={formData.text3}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="previous action-button"
            onClick={handlePrevious}
          >
            {" "}
            Previous{" "}
          </button>
          <button type="submit" className="submit action-button">
            {" "}
            Submit{" "}
          </button>
        </Fieldset>{" "}
        {activeFieldset === 3 && (
          <Fieldset title="Extraction Results" style={{ display: "block" }}>
            <button
              type="button"
              className="previous action-button"
              onClick={handlePrevious}
            >
              {" "}
              Previous{" "}
            </button>
            {displayExtractedContent && <pre>{extractedContent}</pre>}
          </Fieldset>
        )}
      </form>
    </div>
  );
};
export default App;
*/
import React, { useState,useEffect,useRef } from 'react'; 
import axios from 'axios'; 
import * as html2pdf from 'html2pdf.js'; 
// import { BASE_URL } from './helper';
import './form.css'; 

const ProgressBar = ({ activeFieldset }) => ( 
  <ul id="progressbar"> 
  <li className={activeFieldset >= 1 ? 'active completed' : ''}>
  URL EXTRACTION
  </li> 
  <li className={activeFieldset >= 2 ? 'active completed' : ''}>
  SCRAPING
  </li> 
  <li className={activeFieldset >= 3 ? 'active completed' : ''}>
  EXTRACTED DATA
  </li> 
  </ul> 
  ); 

  const Fieldset = ({ title, subtitle, children, style }) => ( 
    <fieldset style={style}> 
    <h2 className="fs-title">
    {title}
    </h2> 
    <h3 className="fs-subtitle">
    {subtitle}
    </h3> 
    {children} 
    </fieldset> 
    ); 
   
    const App = () => {
      const [url, setUrl] = useState('');
      const [urls, setUrls] = useState([]);
      const [data, setData] = useState([]);
      const [displayUrls, setDisplayUrls] = useState(false);
      const [activeFieldset, setActiveFieldset] = useState(1);
    const [output, setOutput] = useState('');
      const preRef = useRef(null);
      const [formData, setFormData] = useState({
        text2: '',
        text3: '',
      });
      const [extractedoutput, setExtractedoutput] = useState(''); 
      const [displayExtractedoutput, setDisplayExtractedoutput] = useState(false);  
      const [selectors, setSelectors] = useState(''); 
      const [loading, setLoading] = useState('');
      const [showUrlWarning, setShowUrlWarning] = useState(false); 
     
      const isUrlValid = (userInput) => {
      const res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g);
        return res !== null;
      };

           

      // const fetchData = async () => {
      //   if (isUrlValid(url)) {
      //     if (url.trim() !== '') {
      //       try {
      //         const res = await axios.get('http://localhost:5002/urls');
      //         setData(Array.from(res.data.urls) || []);
      //         setDisplayUrls(true);
      //       } catch (error) {
      //         console.error('Error fetching data:', error);
      //       }
      //     }
      //   }
      // };

      useEffect(()=>{   
            if(isUrlValid(url)){ 
        if (url.trim() !== ''){
        try{
        axios.get('http://localhost:5002/urls')
        .then((res)=>{
          setData(Array.from(res.data.urls)||[]);
          setDisplayUrls(true);
         })
      }catch (error) {
                console.error('Error fetching data:', error);
              }
            }
          }  
      }, [url])

      
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
         const response = await axios.post('http://localhost:5002/scrape', {url},
          {
            timeout:500000,
          }); 
          console.log("Response:", response);
          // const scrapedUrls =Array.from( response.data.urls) || [];
          // setData(scrapedUrls);
          setDisplayUrls(true);
          
          // fetchData();
          // setOutput(response.data.urls);
      }catch(err){console.log("app")}
        
      };
      
    const handleDownloadPDF = () => {   
      const element = document.querySelector('.url-list');
      const pdfOptions = {
        title:'List of Scraped URLs',
        margin: 10,
        filename: 'output.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };
      html2pdf().from(element).set(pdfOptions).save();
    };

    const handleDownloadPDF2 = () => {
      const element = preRef.current;
      const pdfOptions = {
        margin: 10,
        filename: 'output.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a2', orientation: 'portrait' },
      };
   
      html2pdf(element, pdfOptions);
    };
    
      const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
     
      const handlePrevious = () => {
        setActiveFieldset((prevActiveFieldset) => prevActiveFieldset - 1);
      };
      const handleNext = () => {
        setActiveFieldset((prevActiveFieldset) => prevActiveFieldset + 1);
      };
      
     
      
      // const handleSubmit2 = async (e) => {
      //   e.preventDefault();
      //   try {
      //     const response = await fetch('http://localhost:5002/scrapes', {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify({ urls: urls.split('\n'), selectors: selectors.split('\n') }),
      //     });
      //     const result = await response.json();
      //     setData(result.pages);
      //   } catch (error) {
      //     console.error('Error fetching data:', error);
      //   }
      // };

      const handleSubmit2 = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          const response = await axios.post('http://localhost:5002/scrapes', {
            urls: urls.split(',').map((url) => url.trim()),
            selectors: selectors.split(',').map((selector) => selector.trim()),
          }, {
            timeout: 5000,
          });
          // console.log(response.data + '\n');
          setOutput(response.data.tableString);
          handleNext();
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setLoading(false); 
        }
      };
      return (
    <div>
    <ProgressBar activeFieldset={activeFieldset} />
      <form id="msform" onSubmit={handleSubmit} >
        <Fieldset style={{ display: activeFieldset === 1 ? 'block' : 'none' }} className= 'complete'>
          <h2 className="fs-title">Provide the Main URL</h2>
          <h3 className="fs-subtitle">This step will provide the list of all URLs</h3>
          <input
            type="text"
            name="email"
            value={url}
            placeholder="Main URL"
            onChange={(e) => {setUrl(e.target.value);
            setShowUrlWarning(!isUrlValid(e.target.value)); 
            }  }          
                                   
          />
          {showUrlWarning && <p style={{ color: 'red' }}>Please enter a valid URL.</p>}
          
            <button type="button" className="download action-button" onClick={handleDownloadPDF}>
              Download
            </button>
            <button type="submit" className="submit action-button" onClick={handleSubmit}>
            Submit
          </button>
          <button
          type="button"
          className="next action-button"
          onClick={handleNext}
          disabled={!url || showUrlWarning}
        >
          Next
     </button>
         {displayUrls && (
          <div title="Extracted URLs" style={{ display: 'block' }} className="url-container">
            <h2>List of URLs:</h2>
            <ul className="url-list">
              {data.map((url, index) => (
                <li key={index} className="url-item">
                <a href={url} target="_blank" rel="noopener noreferrer" className="url-link">{url}</a>
        </li>
              ))}
            </ul>
          </div>
        )}  
          </Fieldset>

          <Fieldset style={{ display: activeFieldset === 2  ? 'block' : 'none' }}>
       <h2 className="fs-title">SCRAPING STAGE</h2>
        <h3 className="fs-subtitle">Enter the URL and the selector that you want to scrape</h3>
        <input
        type="text"
        value={urls}
        placeholder="Enter URL to scrape"
        onChange={(e) => {
        setUrls(e.target.value);
        setShowUrlWarning(!isUrlValid(e.target.value));
        }}
      />
        <input type="text" placeholder="Selectors" value={selectors} onChange={(e) => setSelectors(e.target.value)} />
        {showUrlWarning && <p style={{ color: 'red' }}>Please enter a valid URL.</p>}
        <button type="button" className="previous action-button" onClick={handlePrevious} >
        Previous
        </button>
        <button
        type="submit"
        className="submit action-button"
        onClick={handleSubmit2}
        disabled={!urls || !selectors || showUrlWarning || loading}>
         {loading ? 'Loading...' : 'Submit'}
        </button>
        </Fieldset>
 
     
        <Fieldset style={{ display: activeFieldset === 3 ? 'block' : 'none' }}>
        <h2 className="fs-title">EXTRACTED DATA</h2>
        <div className="result" style={{maxHeight: '300px', textAlign:'left', maxWidth:'800px', overflow: 'auto', margin: '0 auto'}} >
          <pre ref={preRef}>{output}</pre>
        </div>
        <button type="button" className="previous action-button" onClick={handlePrevious}>
          Previous
        </button>
        <button
          type="button"
          className="next action-button"
          onClick={handleDownloadPDF2}
            disabled={!output.trim()}
         
        >
          Download
        </button>
      </Fieldset>        
      </form>
    </div>
  );
};
 
export default App;