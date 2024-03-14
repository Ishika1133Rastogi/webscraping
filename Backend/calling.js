// const express = require('express');
// const axios = require('axios');
// const bodyParser = require('body-parser');
// const scrap = require('./scraper1');
// const cors = require('cors');
// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const path = require('path');
// require('dotenv').config();
// require('./db/conn');
// const createNewCollection = require('./Link');
// const app = express();
// app.use(bodyParser.json());
// const Link_data = require('./Link');
// app.use(cors())

// PORT = 5000

// app.post('/scrape', async (req, res) => {
//   const { url } = req.body;
//   if (!url) {
//     return res.status(400).json({ error: 'URL is required' });
//   }

//   try {
//     const urls = await scrap(url, null, new URL(url).hostname);
//     res.json({ urls });
//   } catch (error) {
//     console.error('Error scraping URL:', url, error);
//     res.status(500).json({ error: 'An error occurred while scraping URL' });
//   }
// });

// async function generatePDF() {
//   try {
//     const data = await Link_data.find();

//     const doc = new PDFDocument();
//     doc.pipe(fs.createWriteStream('data.pdf'));

//     doc.fontSize(16).text('Data from MongoDB', { align: 'center' });
//     doc.moveDown();

//     data.forEach((item, index) => {
//       doc.fontSize(12).text(`#${index + 1} - URL: ${item.url}`);
//       doc.moveDown();
//     });

//     doc.end();
//     console.log('PDF generated successfully');
//   } catch (error) {
//     console.error('Error generating PDF:', error);
//   }
// }

// app.get('/generate-pdf', (req, res) => {
//   const filePath = path.join(__dirname, 'data.pdf');
//   res.download(filePath, 'data.pdf', (err) => {
//     if (err) {
//       console.error('Error downloading PDF:', err);
//       res.status(500).json({ error: 'Failed to download PDF' });
//     } else {
//       console.log('PDF downloaded successfully');
//     }
//   });
// });

// generatePDF();

// app.post('/scrape', async (req, res) => {
//   const { url } = req.body;
//   if (!url) {
//     return res.status(400).json({ error: 'URL is required' });
//   }

//   try {
//     const urls = await scrap(url, null, new URL(url).hostname);
//     res.json({ urls });
//   } catch (error) {
//     console.error('Error scraping URL:', url, error);
//     res.status(500).json({ error: 'An error occurred while scraping URL' });
//   }
// });

// app.get('/scrape', (req, res)=>{
//     Link_data.find()
//     .then(Link_data => res.json(Link_data))
//     .catch(err => res.json(err))
// })

// app.listen(PORT, () => {
//   console.log('Server running on port 5000');
// });

// ..............................................................perfect
// const express = require('express');
// const axios = require('axios');
// const cheerio = require('cheerio');

// const app = express();
// const cors = require('cors');
// const urlModule = require('url');
// const bodyParser = require('body-parser');
// const fs = require('fs');

// require('dotenv').config();
// require('./db/conn');
// const Link = require('./Link');
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// PORT =5002;
// app.use(bodyParser.json());
// app.use(cors())

// async function scrap(url, parent = null, baseUrl) {
//   try {
//     const response = await axios.get(url);
//     const $ = cheerio.load(response.data);
//     const base = urlModule.parse(url);

//     const urls = [];

//     $('a').each((index, element) => {
//       const href = $(element).attr('href');
//       if (href) {
//         const absoluteUrl = urlModule.resolve(base.href, href);
//         const absoluteUrlParsed = urlModule.parse(absoluteUrl);
//         if (absoluteUrlParsed.hostname === baseUrl) {
//           urls.push(absoluteUrl);
//         }
//       }
//     });

//     const savedUrls = [];
//     for (const u of urls) {
//       const existingLink = await Link.findOne({ url: u });
//       if (!existingLink) {
//         const link = new Link({ url: u });
//         if (parent) {
//           link.children.push(parent);
//         }
//         await link.save();
//         savedUrls.push(link);
//       }
//     }
//     for (const savedUrl of savedUrls) {
//       await scrap(savedUrl.url, savedUrl._id, baseUrl);
//     }
//     return urls;
//   } catch (error) {
//     console.error('Error scraping URL:', url, error);
//     return [];
//   }
// }

// app.post('/scrape', async (req, res) => {
//   const { url } = req.body;
//   if (!url) {
//     return res.status(400).json({ error: 'URL is required' });
//   }

//   try {
//     const urls = await scrap(url, null, new URL(url).hostname);
//     if (!urls || !urls.length) {
//       return res.status(404).json({ error: 'No URLs found' });
//     }
//     const data = urls.join('\n');

//     const outputpath = "./output.txt";
//     fs.writeFileSync(outputpath, data, 'utf-8');
//     res.json({ urls, outputpath });
//   } catch (error) {
//     console.error('Error scraping URL:', url, error);
//     res.status(500).json({ error: 'An error occurred while scraping URL' });
//   }
// });

// app.get('/output', (req, res) => {
//   fs.readFile('./output.txt', 'utf8', (err, data) => {
//     if (err) {
//       console.error('Error reading file:', err);
//       return res.status(500).json({ error: 'An error occurred while reading the file' });
//     }
//     res.json({ content: data });
//   });
// });

// app.get('/scrape', (req, res)=>{
//     Link.find()
//     .then(Link => res.json(Link))
//     .catch(err => res.json(err))
// })

// app.listen(PORT, () => {
//   console.log('Server running on port 5000');
// });

// ..................................................................................

// const express = require('express');
// const axios = require('axios');
// const bodyParser = require('body-parser');
// const scrap = require('./scraper1');
// const cors = require('cors');
// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const path = require('path');
// require('dotenv').config();
// // require('./db/conn')
// const app = express();
// app.use(bodyParser.json());
// const Link_data = require('./Link');
// app.use(cors())

// PORT = 5000

// app.post('/scrape', async (req, res) => {
//   const { url } = req.body;
//   if (!url) {
//     return res.status(400).json({ error: 'URL is required' });
//   }

//   try {
//     const urls = await scrap(url, null, new URL(url).hostname);
//     res.json({ urls });
//   } catch (error) {
//     console.error('Error scraping URL:', url, error);
//     res.status(500).json({ error: 'An error occurred while scraping URL' });
//   }
// });

// async function generatePDF() {
//   try {
//     const data = await Link_data.find();

//     const doc = new PDFDocument();
//     doc.pipe(fs.createWriteStream('data.pdf'));

//     doc.fontSize(16).text('Data from MongoDB', { align: 'center' });
//     doc.moveDown();

//     data.forEach((item, index) => {
//       doc.fontSize(12).text( `#${index + 1} - URL: ${item.url}`);
//       doc.moveDown();
//     });
//     doc.end();
//     console.log('PDF generated successfully');
//   } catch (error) {
//     console.error('Error generating PDF:', error);
//   }
// }

// app.get('/generate-pdf', (req, res) => {
//   const filePath = path.join(__dirname, 'data.pdf');
//   res.download(filePath, 'data.pdf', (err) => {
//     if (err) {
//       console.error('Error downloading PDF:', err);
//       res.status(500).json({ error: 'Failed to download PDF' });
//     } else {
//       console.log('PDF downloaded successfully');
//     }
//   });
// });

// generatePDF();

// app.post('/scrape', async (req, res) => {
//   const { url } = req.body;
//   if (!url) {
//     return res.status(400).json({ error: 'URL is required' });
//   }

//   try {
//     const urls = await scrap(url, null, new URL(url).hostname);
//     res.json({ urls });
//   } catch (error) {
//     console.error('Error scraping URL:', url, error);
//     res.status(500).json({ error: 'An error occurred while scraping URL' });
//   }
// });

// app.get('/scrape', (req, res)=>{
//     Link_data.find()
//     .then(Link_data => res.json(Link_data))
//     .catch(err => res.json(err))
// })

// app.listen(PORT, () => {
//   console.log('Server running on port 5000');
// });

// const express = require('express');
// const axios = require('axios');
// const bodyParser = require('body-parser');
// const scrap = require('./scraper1');
// const cors = require('cors');
// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const path = require('path');
// require('dotenv').config();
// require('./db/conn');
// const createNewCollection = require('./Link');
// const app = express();
// app.use(bodyParser.json());
// const Link_data = require('./Link');
// app.use(cors())
// PORT = 5000
// app.post('/scrape', async (req, res) => {
// const { url } = req.body;
// if (!url) {
// return res.status(400).json({ error: 'URL is required' });
// }
// try {
// const urls = await scrap(url, null, new URL(url).hostname);
// res.json({ urls });
// } catch (error) {
// console.error('Error scraping URL:', url, error);
// res.status(500).json({ error: 'An error occurred while scraping URL' });
// }
// });
// async function generatePDF() {
// try {
// const data = await Link_data.find();
// const doc = new PDFDocument();
// doc.pipe(fs.createWriteStream('data.pdf'));
// doc.fontSize(16).text('Data from MongoDB', { align: 'center' });
// doc.moveDown();
// data.forEach((item, index) => {
// doc.fontSize(12).text(#${index + 1} - URL: ${item.url});
// doc.moveDown();
// });
// doc.end();
// console.log('PDF generated successfully');
// } catch (error) {
// console.error('Error generating PDF:', error);
// }
// }
// app.get('/generate-pdf', (req, res) => {
// const filePath = path.join(__dirname, 'data.pdf');
// res.download(filePath, 'data.pdf', (err) => {
// if (err) {
// console.error('Error downloading PDF:', err);
// res.status(500).json({ error: 'Failed to download PDF' });
// } else {
// console.log('PDF downloaded successfully');
// }
// });
// });
// generatePDF();
// app.post('/scrape', async (req, res) => {
// const { url } = req.body;
// if (!url) {
// return res.status(400).json({ error: 'URL is required' });
// }
// try {
// const urls = await scrap(url, null, new URL(url).hostname);
// res.json({ urls });
// } catch (error) {
// console.error('Error scraping URL:', url, error);
// res.status(500).json({ error: 'An error occurred while scraping URL' });
// } // });
// app.get('/scrape', (req, res)=>{
// Link_data.find()
// .then(Link_data => res.json(Link_data))
// .catch(err => res.json(err))
// })
// app.listen(PORT, () => {
// console.log('Server running on port 5000');
// });
// ..............................................................perfect
// const express = require('express');
// const axios = require('axios');
// const bodyParser = require('body-parser');
// const scrap = require('./scraper1');
// const cors = require('cors');
// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const path = require('path');
// require('dotenv').config();
// require('./db/conn');
// const createNewCollection = require('./Link');
// const app = express();
// app.use(bodyParser.json());
// const Link_data = require('./Link');
// app.use(cors())

// PORT = 5000

// app.post('/scrape', async (req, res) => {
//   const { url } = req.body;
//   if (!url) {
//     return res.status(400).json({ error: 'URL is required' });
//   }

//   try {
//     const urls = await scrap(url, null, new URL(url).hostname);
//     res.json({ urls });
//   } catch (error) {
//     console.error('Error scraping URL:', url, error);
//     res.status(500).json({ error: 'An error occurred while scraping URL' });
//   }
// });

// async function generatePDF() {
//   try {
//     const data = await Link_data.find();

//     const doc = new PDFDocument();
//     doc.pipe(fs.createWriteStream('data.pdf'));

//     doc.fontSize(16).text('Data from MongoDB', { align: 'center' });
//     doc.moveDown();

//     data.forEach((item, index) => {
//       doc.fontSize(12).text(`#${index + 1} - URL: ${item.url}`);
//       doc.moveDown();
//     });

//     doc.end();
//     console.log('PDF generated successfully');
//   } catch (error) {
//     console.error('Error generating PDF:', error);
//   }
// }

// app.get('/generate-pdf', (req, res) => {
//   const filePath = path.join(__dirname, 'data.pdf');
//   res.download(filePath, 'data.pdf', (err) => {
//     if (err) {
//       console.error('Error downloading PDF:', err);
//       res.status(500).json({ error: 'Failed to download PDF' });
//     } else {
//       console.log('PDF downloaded successfully');
//     }
//   });
// });

// generatePDF();

// app.post('/scrape', async (req, res) => {
//   const { url } = req.body;
//   if (!url) {
//     return res.status(400).json({ error: 'URL is required' });
//   }

//   try {
//     const urls = await scrap(url, null, new URL(url).hostname);
//     res.json({ urls });
//   } catch (error) {
//     console.error('Error scraping URL:', url, error);
//     res.status(500).json({ error: 'An error occurred while scraping URL' });
//   }
// });

// app.get('/scrape', (req, res)=>{
//     Link_data.find()
//     .then(Link_data => res.json(Link_data))
//     .catch(err => res.json(err))
// })

// app.listen(PORT, () => {
//   console.log('Server running on port 5000');
// });

// ..............................................................perfect
// const express = require('express');
// const axios = require('axios');
// const cheerio = require('cheerio');

// const app = express();
// const cors = require('cors');
// const urlModule = require('url');
// const bodyParser = require('body-parser');
// const fs = require('fs');

// require('dotenv').config();
// require('./db/conn');
// const Link = require('./Link');
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// PORT =5002;
// app.use(bodyParser.json());
// app.use(cors())

// async function scrap(url, parent = null, baseUrl) {
//   try {
//     const response = await axios.get(url);
//     const $ = cheerio.load(response.data);
//     const base = urlModule.parse(url);

//     const urls = [];

//     $('a').each((index, element) => {
//       const href = $(element).attr('href');
//       if (href) {
//         const absoluteUrl = urlModule.resolve(base.href, href);
//         const absoluteUrlParsed = urlModule.parse(absoluteUrl);
//         if (absoluteUrlParsed.hostname === baseUrl) {
//           urls.push(absoluteUrl);
//         }
//       }
//     });

//     const savedUrls = [];
//     for (const u of urls) {
//       const existingLink = await Link.findOne({ url: u });
//       if (!existingLink) {
//         const link = new Link({ url: u });
//         if (parent) {
//           link.children.push(parent);
//         }
//         await link.save();
//         savedUrls.push(link);
//       }
//     }
//     for (const savedUrl of savedUrls) {
//       await scrap(savedUrl.url, savedUrl._id, baseUrl);
//     }
//     return urls;
//   } catch (error) {
//     console.error('Error scraping URL:', url, error);
//     return [];
//   }
// }

// app.post('/scrape', async (req, res) => {
//   const { url } = req.body;
//   if (!url) {
//     return res.status(400).json({ error: 'URL is required' });
//   }

//   try {
//     const urls = await scrap(url, null, new URL(url).hostname);
//     if (!urls || !urls.length) {
//       return res.status(404).json({ error: 'No URLs found' });
//     }
//     const data = urls.join('\n');

//     const outputpath = "./output.txt";
//     fs.writeFileSync(outputpath, data, 'utf-8');
//     res.json({ urls, outputpath });
//   } catch (error) {
//     console.error('Error scraping URL:', url, error);
//     res.status(500).json({ error: 'An error occurred while scraping URL' });
//   }
// });

// app.get('/output', (req, res) => {
//   fs.readFile('./output.txt', 'utf8', (err, data) => {
//     if (err) {
//       console.error('Error reading file:', err);
//       return res.status(500).json({ error: 'An error occurred while reading the file' });
//     }
//     res.json({ content: data });
//   });
// });

// app.get('/scrape', (req, res)=>{
//     Link.find()
//     .then(Link => res.json(Link))
//     .catch(err => res.json(err))
// })

// app.listen(PORT, () => {
//   console.log('Server running on port 5000');
// });

// ..................................................................................

// const express = require('express');
// const axios = require('axios');
// const bodyParser = require('body-parser');
// const scrap = require('./scraper1');
// const cors = require('cors');
// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const path = require('path');
// require('dotenv').config();
// // require('./db/conn')
// const app = express();
// app.use(bodyParser.json());
// const Link_data = require('./Link');
// app.use(cors())

// PORT = 5000

// app.post('/scrape', async (req, res) => {
//   const { url } = req.body;
//   if (!url) {
//     return res.status(400).json({ error: 'URL is required' });
//   }

//   try {
//     const urls = await scrap(url, null, new URL(url).hostname);
//     res.json({ urls });
//   } catch (error) {
//     console.error('Error scraping URL:', url, error);
//     res.status(500).json({ error: 'An error occurred while scraping URL' });
//   }
// });

// async function generatePDF() {
//   try {
//     const data = await Link_data.find();

//     const doc = new PDFDocument();
//     doc.pipe(fs.createWriteStream('data.pdf'));

//     doc.fontSize(16).text('Data from MongoDB', { align: 'center' });
//     doc.moveDown();

//     data.forEach((item, index) => {
//       doc.fontSize(12).text( `#${index + 1} - URL: ${item.url}`);
//       doc.moveDown();
//     });
//     doc.end();
//     console.log('PDF generated successfully');
//   } catch (error) {
//     console.error('Error generating PDF:', error);
//   }
// }

// app.get('/generate-pdf', (req, res) => {
//   const filePath = path.join(__dirname, 'data.pdf');
//   res.download(filePath, 'data.pdf', (err) => {
//     if (err) {
//       console.error('Error downloading PDF:', err);
//       res.status(500).json({ error: 'Failed to download PDF' });
//     } else {
//       console.log('PDF downloaded successfully');
//     }
//   });
// });

// generatePDF();

// app.post('/scrape', async (req, res) => {
//   const { url } = req.body;
//   if (!url) {
//     return res.status(400).json({ error: 'URL is required' });
//   }

//   try {
//     const urls = await scrap(url, null, new URL(url).hostname);
//     res.json({ urls });
//   } catch (error) {
//     console.error('Error scraping URL:', url, error);
//     res.status(500).json({ error: 'An error occurred while scraping URL' });
//   }
// });

// app.get('/scrape', (req, res)=>{
//     Link_data.find()
//     .then(Link_data => res.json(Link_data))
//     .catch(err => res.json(err))
// })

// app.listen(PORT, () => {
//   console.log('Server running on port 5000');
// });

// const express = require('express');
// const axios = require('axios');
// const bodyParser = require('body-parser');
// const scrap = require('./scraper1');
// const cors = require('cors');
// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const path = require('path');
// require('dotenv').config();
// require('./db/conn');
// const createNewCollection = require('./Link');
// const app = express();
// app.use(bodyParser.json());
// const Link_data = require('./Link');
// app.use(cors())
// PORT = 5000
// app.post('/scrape', async (req, res) => {
// const { url } = req.body;
// if (!url) {
// return res.status(400).json({ error: 'URL is required' });
// }
// try {
// const urls = await scrap(url, null, new URL(url).hostname);
// res.json({ urls });
// } catch (error) {
// console.error('Error scraping URL:', url, error);
// res.status(500).json({ error: 'An error occurred while scraping URL' });
// }
// });
// async function generatePDF() {
// try {
// const data = await Link_data.find();
// const doc = new PDFDocument();
// doc.pipe(fs.createWriteStream('data.pdf'));
// doc.fontSize(16).text('Data from MongoDB', { align: 'center' });
// doc.moveDown();
// data.forEach((item, index) => {
// doc.fontSize(12).text(#${index + 1} - URL: ${item.url});
// doc.moveDown();
// });
// doc.end();
// console.log('PDF generated successfully');
// } catch (error) {
// console.error('Error generating PDF:', error);
// }
// }
// app.get('/generate-pdf', (req, res) => {
// const filePath = path.join(__dirname, 'data.pdf');
// res.download(filePath, 'data.pdf', (err) => {
// if (err) {
// console.error('Error downloading PDF:', err);
// res.status(500).json({ error: 'Failed to download PDF' });
// } else {
// console.log('PDF downloaded successfully');
// }
// });
// });
// generatePDF();
// app.post('/scrape', async (req, res) => {
// const { url } = req.body;
// if (!url) {
// return res.status(400).json({ error: 'URL is required' });
// }
// try {
// const urls = await scrap(url, null, new URL(url).hostname);
// res.json({ urls });
// } catch (error) {
// console.error('Error scraping URL:', url, error);
// res.status(500).json({ error: 'An error occurred while scraping URL' });
// } // });
// app.get('/scrape', (req, res)=>{
// Link_data.find()
// .then(Link_data => res.json(Link_data))
// .catch(err => res.json(err))
// })
// app.listen(PORT, () => {
// console.log('Server running on port 5000');
// });
// ..............................................................perfect
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); 
const scrap = require('./scraper1');
const mongoose = require('mongoose');
// require('./db/conn')
const pdf = require('html-pdf');
const Json2csvParser = require('json2csv').Parser;
const axios = require('axios')
app.use(cors()); 
const request = require('request-promise');
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
PORT = process.env.PORT||5002; 
app.use(bodyParser.json()); 
const fs = require('fs'); 
const { URL } = require('url');
const cheerio = require('cheerio');



//DATABASE

try {
  mongoose.connect('mongodb+srv://ishikarastogi57:teena123@cluster0.8xhkhkk.mongodb.net/webScraper?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
 console.log(`✅ Connected to database`);
} catch (error) {
 console.log(`❌ Error connecting to database: ${DB}`, error);
}

const urlSchema = new mongoose.Schema({
  url: String,
  isChecked: { type: Boolean, default: false },
});
const Url21 = mongoose.model('Url21', urlSchema);

//SCRAPER API CALL FOR FIRST STEP

app.post('/scrape', async (req, res) => {
  const { url } = req.body;
  console.log(url);
  if (!url) {
      return res.status(400).json({ error: 'URL is required' });
  }
  try {
      const visitedUrls = new Set();
       fs.readFileSync('output.txt', '');
      fs.writeFileSync('output.txt', '');
      const urls2 = await scrap(url, null, new URL(url), visitedUrls);
      console.log("urls2",urls2)
      return res.status(200).json({ urls2 });
  } catch (error) {
      console.error('Error scraping UR2L:', url, error);
      return res.status(500).json({ error: 'An error occurred while scraping URL' });
  }
});


  function storedata(){
fs.readFile('output.txt', 'utf8', async (err, data) => {
  if (err) {
    console.error('Error reading output file:', err);
    return;
  }
  const urls = data.split('\n');
  console.log(urls.length)
  // Save each line as a new document in MongoDB
  for (const line of urls) {
    try {
      
      const newData = new Url21({ url: line });
      await newData.save();
      console.log('Saved:', line);
    } catch (error) {
      console.error('Error saving data to MongoDB:', error);
    }
  }
});
  }

  
      //storedata();
      

 
//STORE JSON DATA AT /URLS FROM OUTPUT.TXT FILE

app.get('/urls', async(req, res) => {
  try {
    // console.log("00")
      const data = fs.readFileSync('output.txt', 'utf8');
      const urls = data.split('\n').filter(Boolean); // Filter out empty lines
     console.log(urls.length)
      res.status(200).json({ urls });
       storedata()
  } catch (error) {
      console.error('Error reading output file:', error);
      res.status(500).json({ error: 'An error occurred while reading the output file' });
  }
});


// SCRAPES API CALL FOR SECOND PART

app.post('/scrapes', async (req, res) => {
  const { urls, selectors } = req.body;
  let pages = [];

  for (let article of urls) {
    const response = await request({
      uri: article.trim(),
      gzip: true,
    });

    let $ = cheerio.load(response);

    let pageData = {};

    selectors.forEach((selector) => {
      let values = [];
      $(selector).each((index, element) => {
        values.push($(element).text().trim());
      });
      pageData[selector] = values;
    });

    pages.push(pageData);
  }
   

  fs.writeFileSync('./data.json', JSON.stringify(pages), 'utf-8');

  const tableString = getTableString(pages);
  const outputPath = './output2.txt';
  fs.writeFileSync(outputPath, tableString, 'utf-8');

  res.json({ tableString, pages });

  const fields = selectors;
  const json2csvParser = new Json2csvParser({ fields });
  const csv = json2csvParser.parse(pages);
  console.table(pages);
});

function getTableString(pages) {
  let tableString = '';
  pages.forEach((page) => {
    for (let key in page) {
      tableString += `\n ${key}: \n \n  ${page[key].join('\n')}\n`; 
    }
    tableString += '\n'.repeat(3);
  });
  return tableString;
}
    app.listen(PORT, () => { 
      console.log('Server running on port 5002'); 
    });