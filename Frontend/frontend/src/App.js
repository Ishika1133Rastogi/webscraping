// /*import React, { useState,useEffect,useRef } from 'react'; 
// import axios from 'axios'; 
// import * as html2pdf from 'html2pdf.js'; 


// // import { BASE_URL } from './helper';
// import './form.css'; 

// const ProgressBar = ({ activeFieldset }) => ( 
//   <ul id="progressbar"> 
//   <li className={activeFieldset >= 1 ? 'active completed' : ''}>
//   URL EXTRACTION
//   </li> 
//   <li className={activeFieldset >= 2 ? 'active completed' : ''}>
//   SCRAPING
//   </li> 
//   <li className={activeFieldset >= 3 ? 'active completed' : ''}>
//   EXTRACTED DATA
//   </li> 
//   </ul> 
//   ); 

//   const Fieldset = ({ title, subtitle, children, style }) => ( 
//     <fieldset style={style}> 
//     <h2 className="fs-title">
//     {title}
//     </h2> 
//     <h3 className="fs-subtitle">
//     {subtitle}
//     </h3> 
//     {children} 
//     </fieldset> 
//     ); 
   
//     const App = () => {
//       const [url, setUrl] = useState('');
//       const [urls, setUrls] = useState([]);
//       const [data, setData] = useState([]);
//       const [displayUrls, setDisplayUrls] = useState(false);
//       const [activeFieldset, setActiveFieldset] = useState(1);
//     const [output, setOutput] = useState('');
//       const preRef = useRef(null);
//       const [formData, setFormData] = useState({
//         text2: '',
//         text3: '',
//       });
//       const [extractedoutput, setExtractedoutput] = useState(''); 
//       const [displayExtractedoutput, setDisplayExtractedoutput] = useState(false);  
//       const [selectors, setSelectors] = useState(''); 
//       const [loading, setLoading] = useState('');
//       const [showUrlWarning, setShowUrlWarning] = useState(false); 
//       const [flag, setFlag] = useState(false);
//       const [flag2, setFlag2] = useState(false);
//       const [fetchData, setFetchData] = useState(false);

//       const [checkedUrls, setCheckedUrls] = useState({});
//       const [checkedUrls2, setCheckedUrls2] = useState([]);

     

//       const isUrlValid = (userInput) => {
//       const res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g);
//         return res !== null;
//       };

//       const handleCheckboxChange = async(url) => {
//         const newCheckedUrls = {
//           ...checkedUrls,
//           [url]: !checkedUrls[url],
//         };
//         setCheckedUrls(newCheckedUrls);

//     try {
//       await axios.put(`http://localhost:5002/api/update-ischecked`, {url,  isChecked: newCheckedUrls[url] });
//       console.log(`Updated isChecked for ${url}`);
    
//     } catch (error) {
//       console.error('Error updating isChecked:', error);
//     }
//       };

//      //API FOR FETCH TRUE VALUES FROM MONGO
     

//       // const fetchData = async () => {
//       //   if (isUrlValid(url)) {
//       //     if (url.trim() !== '') {
//       //       try {
//       //         const res = await axios.get('http://localhost:5002/urls');
//       //         setData(Array.from(res.data.urls) || []);
//       //         setDisplayUrls(true);
//       //       } catch (error) {
//       //         console.error('Error fetching data:', error);
//       //       }
//       //     }
//       //   }
//       // };

      // useEffect(()=>{   
      //   console.log("hello123")
             
      //   if (url.trim() !== ''){
      //   try{
      //   axios.get('http://localhost:5002/urls')
      //   .then((res)=>{
      //     console.log(res.data);
      //     setData(Array.from(res.data.urls)||[]);
      //     setDisplayUrls(true);
      //    })
      // }catch (error) {
      //           console.error('Error fetching data:', error);
      //         }
      //       }
           
      // }, [flag])

//       const fetchCheckedUrls = async () => {
//         try {
//           const response = await axios.get('http://localhost:5002/api/get-checked-urls');
//           setCheckedUrls2(response.data);
//         } catch (error) {
//           console.error('Error fetching checked URLs:', error);
//         }
//       };

//       // useEffect(() => {
//       //   const fetchCheckedUrls = async () => {
//       //     console.log("hemlo123")
//       //     try {
//       //       const response = await axios.get('http://localhost:5002/api/get-checked-urls');
//       //       setCheckedUrls(response.data);
//       //     } catch (error) {
//       //       console.error('Error fetching checked URLs:', error);
//       //     }
//       //   };
    
//       //   fetchCheckedUrls();
//       // }, [flag2]);
      
//       const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//          const response = await axios.post('http://localhost:5002/scrape', {url},
//           // {
//           //   timeout:500000,
//           // }
//           ); 
//           console.log("Response:", response);
          
//           const myTimeout = setTimeout(myGreeting, 15000);
          
//           function myGreeting() {
//             setFlag((prev)=>!prev)
//           }

//           function myStopFunction() {
//               clearTimeout(myTimeout);
//           }
//           // const scrapedUrls =Array.from( response.data.urls) || [];
//           // setData(scrapedUrls);
//           setDisplayUrls(true);
          
//           // fetchData();
//           // setOutput(response.data.urls);
//       }catch(err){console.log("app")}
//       finally {
//         setLoading(false); 
//       }
        
//       };
      
//     const handleDownloadPDF = () => {   
//       const element = document.querySelector('.url-list');
//       const pdfOptions = {
//         title:'List of Scraped URLs',
//         margin: 10,
//         filename: 'output.pdf',
//         image: { type: 'jpeg', quality: 0.98 },
//         html2canvas: { scale: 2 },
//         jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
//       };
//       html2pdf().from(element).set(pdfOptions).save();
//     };

//     const handleDownloadPDF2 = () => {
//       const element = preRef.current;
//       const pdfOptions = {
//         margin: 10,
//         filename: 'output.pdf',
//         image: { type: 'jpeg', quality: 0.98 },
//         html2canvas: { scale: 2 },
//         jsPDF: { unit: 'mm', format: 'a2', orientation: 'portrait' },
//       };
   
//       html2pdf(element, pdfOptions);
//     };
    
//       const handleInputChange = (value, index) => {
        
//         // setFo/rmData({ ...formData, [e.target.name]: e.target.value });
//         const newSelectors = [...selectors];
//         newSelectors[index] = value;
//         setSelectors(newSelectors);
//       };
     
//       const handlePrevious = () => {
//         setActiveFieldset((prevActiveFieldset) => prevActiveFieldset - 1);
//       };
//       const handleNext = () => {
//         setActiveFieldset((prevActiveFieldset) => prevActiveFieldset + 1);
//         setFetchData(true);
//       };
      
//       useEffect(() => {
//         console.log("hina")
//     if (fetchData) {
//       fetchCheckedUrls();
//       setFetchData(false);
//     }
//   }, [fetchData]);

      
//       // const handleSubmit2 = async (e) => {
//       //   e.preventDefault();
//       //   try {
//       //     const response = await fetch('http://localhost:5002/scrapes', {
//       //       method: 'POST',
//       //       headers: {
//       //         'Content-Type': 'application/json',
//       //       },
//       //       body: JSON.stringify({ urls: urls.split('\n'), selectors: selectors.split('\n') }),
//       //     });
//       //     const result = await response.json();
//       //     setData(result.pages);
//       //   } catch (error) {
//       //     console.error('Error fetching data:', error);
//       //   }
//       // };

//       const handleSubmit2 = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//           const response = await axios.post('http://localhost:5002/scrapes', {
//             urls: urls.split(',').map((url) => url.trim()),
//             selectors: selectors.split(',').map((selector) => selector.trim()),
//           }, {
//             timeout: 5000,
//           });
//           // console.log(response.data + '\n');
//           setOutput(response.data.tableString);
//           handleNext();
//         } catch (error) {
//           console.error('Error:', error);
//         } finally {
//           setLoading(false); 
//         }
//       };
//       return (
//     <div>
//     <ProgressBar activeFieldset={activeFieldset} />
//       <form id="msform" onSubmit={handleSubmit} >
//         <Fieldset style={{ display: activeFieldset === 1 ? 'block' : 'none' }} className= 'complete'>
//           <h2 className="fs-title">Provide the Main URL</h2>
//           <h3 className="fs-subtitle">This step will provide the list of all URLs</h3>
//           <input
//             type="text"
//             name="email"
//             value={url}
//             placeholder="Main URL"
//             onChange={(e) => {setUrl(e.target.value);
//             setShowUrlWarning(!isUrlValid(e.target.value)); 
//             }  }          
                                   
//           />
//           {showUrlWarning && <p style={{ color: 'red' }}>Please enter a valid URL.</p>}
          
//             <button type="button" className="download action-button" onClick={handleDownloadPDF}>
//               Download
//             </button>
//             <button type="submit" className="submit action-button" onClick={handleSubmit} >
//             Submit
//           </button>
          
//           <button
//           type="button"
//           className="next action-button"
//           onClick={handleNext}
//           disabled={!url || showUrlWarning}
          
//         >
//           Next
//      </button>
//          {displayUrls && (
//           <div title="Extracted URLs" style={{ display: 'block' }} className="url-container">
//             <h2>List of URLs:</h2>
//             <ul className="url-list">
//               {data.map((url, index) => (
//                 <li key={index} className="url-item">
//                 <input
//                 type="checkbox"
//                 id={url}
//                 checked={checkedUrls[url] || false}
//                 onChange={() => handleCheckboxChange(url)}
//               />
//                 <a href={url} target="_blank" rel="noopener noreferrer" className="url-link">{url}</a>
//         </li>
//               ))}
//             </ul>
//           </div>
//         )}  
//           </Fieldset>

//           <Fieldset style={{ display: activeFieldset === 2  ? 'block' : 'none' }}>
//           <h2 className="fs-title">Checked urls STAGE</h2>
//           <h3 className="fs-subtitle">Enter the URL and the selector that you want to scrape</h3>
//           <div>
          
//          <div className='checked_urls'>
//           {checkedUrls2.map((url, index) => (
//            <div className="url-list2" key={index} style={{marginTop:"50px"}}>
//            <a href={url.url} target="_blank" rel="noopener noreferrer" className="url-link2">{url.url}</a>
//            <input style={{marginTop:"30px"}} type='text' placeholder="Selectors" value={selectors[index] || ''} onChange={(e) => handleInputChange(e.target.value, index)}/>         

//          </div>
//           ))}
//           </div>
          
//           </div>
          

    
//     <button type="button" className="previous action-button" onClick={handlePrevious} >
//         Previous
//         </button>
        
//         <button
//           type="button"
//           className="next action-button"
//           onClick={handleNext}
//           disabled={!url || !selectors || showUrlWarning ||loading}>
     
        
//           Next
//      </button>
//           </Fieldset>

//         <Fieldset style={{ display: activeFieldset === 4 ? 'block' : 'none' }}>
//         <h2 className="fs-title">EXTRACTED DATA</h2>
//         <div className="result" style={{maxHeight: '300px', textAlign:'left', maxWidth:'800px', overflow: 'auto', margin: '0 auto'}} >
//           <pre ref={preRef}>{output}</pre>
//         </div>
//         <button type="button" className="previous action-button" onClick={handlePrevious}>
//           Previous
//         </button>
//         <button
//           type="button"
//           className="next action-button"
//           onClick={handleDownloadPDF2}
//             disabled={!output.trim()}        
//         >
//           Download
//         </button>
//       </Fieldset>        
//       </form>
//     </div>
//   );
// };
 
// export default App;
// */
// //.........................................................perfect

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
      const [flag, setFlag] = useState(false);
      const [flag2, setFlag2] = useState(false);
      const [selector, setSelector] = useState('');
      const [fetchData, setFetchData] = useState(false);
      const [flags, setFlags] = useState(false)
      const [checkedUrls, setCheckedUrls] = useState({});
      const [checkedUrls2, setCheckedUrls2] = useState([]);
      const [scrapedData, setScrapedData] = useState([]);
      const [checked, setChecked] = useState(false);
 
     
 
      const isUrlValid = (userInput) => {
      const res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g);
        return res !== null;
      };

      const handleCheckboxChange = async(url, id) => {
        const newCheckedUrls = {
          ...checkedUrls,
          [url]: !checkedUrls[url],
        };
        setCheckedUrls(newCheckedUrls);
 
    try {
      await axios.put(`http://localhost:5002/api/update-ischecked`, {url, id, isChecked: newCheckedUrls[url] });
      console.log(`Updated isChecked for ${url}`);
   
    } catch (error) {
      console.error('Error updating isChecked:', error);
    }
      };
  
      useEffect(()=>{  
        console.log("hello123")
             
        if (url.trim() !== ''){
        try{
        axios.get(`http://localhost:5002/api/search?BASE_URL=${url.trim()}`)
        .then((res)=>{
          console.log("response data", res.data);
          setData(Array.from(res.data.scrapedData)||[]);
          setDisplayUrls(true);
          // flags = true;
         })
      }catch (error) {
                console.error('Error fetching data:');
              }
            }
           
      }, [flag])

      const fetchCheckedUrls = async () => {
        try {
          const response = await axios.get('http://localhost:5002/api/get-checked-urls');
          setCheckedUrls2(response.data||[]);
         
        } catch (error) {
          console.error('Error fetching checked URLs:', error);
        }
      };
 
     
 
      // useEffect(() => {
      //   const fetchCheckedUrls = async () => {
      //     console.log("hemlo123")
      //     try {
      //       const response = await axios.get('http://localhost:5002/api/get-checked-urls');
      //       setCheckedUrls(response.data);
      //     } catch (error) {
      //       console.error('Error fetching checked URLs:', error);
      //     }
      //   };
   
      //   fetchCheckedUrls();
      // }, [flag2]);
     
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
         const response = await axios.post('http://localhost:5002/scrape', {url},
          );
          console.log("Response:", response);
         
          const myTimeout = setTimeout(myGreeting, 30000);
         
          function myGreeting() {
            setFlag((prev)=>!prev)
          }
 
          function myStopFunction() {
              clearTimeout(myTimeout);
          }
          // const scrapedUrls =Array.from( response.data.urls) || [];
          // setData(scrapedUrls);
          setDisplayUrls(true);
         
          // fetchData();
          // setOutput(response.data.urls);
      }catch(err){console.log("app")}
      finally {
        setLoading(false);
      }
       
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
   
      const handleInputChange = (value, index) => {
       
        // setFo/rmData({ ...formData, [e.target.name]: e.target.value });
        const newSelectors = [...selectors];
        newSelectors[index] = value;
        setSelectors(newSelectors);
      };
     
      const handlePrevious = () => {
        setActiveFieldset((prevActiveFieldset) => prevActiveFieldset - 1);
      };
      const handleNext = () => {
        setActiveFieldset((prevActiveFieldset) => prevActiveFieldset + 1);
        setFetchData(true);
      };
     
      useEffect(() => {
        console.log("hina")
    if (fetchData) {
      fetchCheckedUrls();
      setFetchData(false);
    }
  }, [fetchData]);
 
      const handleSubmit2 = async (e) => {
        // e.preventDefault();
        setLoading(true);
     
        try {
            // Handle the scraped data as needed
          const response = await axios.post('http://localhost:5002/scrapes', {
         
          selector: selectors[e].toString().split(',').map((selector) => selector.trim()),
          }, {
            timeout: 5000,
          });
         
          console.log('Selector123:', selectors[e]);
          console.log('Response:', response.data.selector + '\n');
     
          // setOutput(response.data);      
          // handleNext();
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setChecked(false);
          setLoading(false);
        }
      };
 
      const handleCheckboxChange2 = (e) => {
        setChecked(e.target.checked);
        setChecked(true)
      };
     
      const handleScrapeData = async () => {
        setLoading(true);
        try {
          console.log("/scrape-data api");
          const response = await axios.post('http://localhost:5002/scrape-data', { selector });
          console.log("response scrape-data", response)
          setScrapedData(response.data);
 
        } catch (error) {
          console.error('Error scraping data:', error);
        } finally {
          setLoading(false);
        }
      };
      // const handleSubmit2 = async (e) => {
      //   e.preventDefault();
      //   setLoading(true);
      //   try {
      //     const response = await axios.post('http://localhost:5002/scrapes', {
      //       urls: urls.split(',').map((url) => url.trim()),
      //       selectors: selectors.split(',').map((selector) => selector.trim()),
      //     }, {
      //       timeout: 5000,
      //     });
      //     // console.log(response.data + '\n');
      //     setOutput(response.data.tableString);
      //     handleNext();
      //   } catch (error) {
      //     console.error('Error:', error);
      //   } finally {
      //     setLoading(false);
      //   }
      // };
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
            <button type="submit" className="submit action-button" onClick={handleSubmit} >
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
            <ul className="url-list1">
              {data.map((url, index) => (
                <li key={index} className="url-item1">
                <input
                type="checkbox"
                id={url._id}
                checked={url.isChecked || checkedUrls[url.url] || false}
                onChange={() => handleCheckboxChange(url.url, url._id)}
              />
                <a href={url.url} target="_blank" rel="noopener noreferrer" className="url-link1">{url.url}</a>
        </li>
              ))}
            </ul>
          </div>
        )}  
          </Fieldset>
 
          <Fieldset style={{ display: activeFieldset === 2  ? 'block' : 'none' }}>
          <h2 className="fs-title">Checked urls STAGE</h2>
          <h3 className="fs-subtitle">Enter the URL and the selector that you want to scrape</h3>
          <div>
         
         <div className='checked_urls'>
          {checkedUrls2.map((url, index) => (
           <div className="url-list2" key={index} style={{marginTop:"50px"}}>
           <a href={url.url} target="_blank" rel="noopener noreferrer" className="url-link2">{url.url}</a>
           <input style={{marginTop:"30px"}} type='text' placeholder="Selectors" value={selectors[index] || ''} onChange={(e) => handleInputChange(e.target.value, index)}/>        
           <button
        type="submit"
        className="submit action-button"
        onClick={() => handleSubmit2(index)}
        // onClick={handleSubmit2}
        disabled={!urls || !selectors || showUrlWarning || loading}>
         {loading ? 'Loading...' : 'Submit'}
        </button>
           {/* <input type="checkbox" checked={checked} onChange={handleCheckboxChange2} onClick={handleSubmit2} /> */}
         </div>
          ))}
          </div>
          </div>
    <button type="button" className="previous action-button" onClick={handlePrevious} >
        Previous
        </button>
        <button onClick={handleScrapeData} disabled={loading}>
        {loading ? 'Loading...' : 'Scrape Data'}
      </button>
     
      {/* {scrapedData.map(({ url, data }, index) => (
  <div key={index}>
  <p>URL: {url}</p>
  <div>
    {Object.keys(data).map((key) => (
      <div key={key}>
        <strong>{key}:</strong> {data[key]}
      </div>
    ))}
  </div>
</div>
))} */}
   
        {/* <button
        type="submit"
        className="submit action-button"
        onClick={handleSubmit2}
        disabled={!urls || !selectors || showUrlWarning || loading}>
         {loading ? 'Loading...' : 'Submit'}
        </button> */}
       
          </Fieldset>
 
        {/* <Fieldset style={{ display: activeFieldset === 3 ? 'block' : 'none' }}>
        <h2 className="fs-title">EXTRACTED DATA</h2>
        <div className="result" style={{maxHeight: '300px', textAlign:'left', maxWidth:'800px', overflow: 'auto', margin: '0 auto'}} >
          <pre ref={preRef}>{scrapedData}</pre>
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
                */}
      </form>
    </div>
  );
};
 
export default App;

