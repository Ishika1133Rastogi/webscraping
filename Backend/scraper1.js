// const express = require('express');
// const axios = require('axios');
// const cheerio = require('cheerio'); 
// const app = express();
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const fs = require('fs'); 
// require('dotenv').config(); 
// app.use(cors()); 
// app.use(express.urlencoded({ extended: true })); 
// app.use(express.json()); 
// PORT =5002; 
// app.use(bodyParser.json()); 
// app.use(cors()) 

// const { URL } = require('url');


// async function scrap(url, parent = null, baseUrl, visitedUrls, limit = 2000) {
//   try {
//     if (visitedUrls.size >= limit || visitedUrls.has(url)) {
//       return [];
//     }

//     visitedUrls.add(url);
//     const absoluteUrl = new URL(url, baseUrl);
//     fs.appendFileSync('output.txt', absoluteUrl.href + '\n');

//     const response = await axios.get(absoluteUrl.href);
//     const $ = cheerio.load(response.data);

//     const childUrls = [];
//     $('a').each(async(index, element) => {
//       const href = $(element).attr('href');
//       if (href) {
//         const childUrl = new URL(href, absoluteUrl);
//         if (childUrl.hostname === baseUrl.hostname) {
//           childUrls.push(childUrl.href);
//           await scrap(childUrl.href, absoluteUrl.href, baseUrl, visitedUrls, limit);
//         }
//       }
//     });
//     return childUrls;
//   } catch (error) {
//     return [];
//   }
// }
// module.exports = scrap



const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

const scrapedDataSchema = new mongoose.Schema({
  url: String,
  isChecked: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

const baseSchema = new mongoose.Schema({
  BASE_URL: {
    type: String,
    unique: true
  },
  scrapedData: [scrapedDataSchema]
});

const Base2 = mongoose.model('Base2', baseSchema);

// async function scrap(url, parent = null, baseUrl, visitedUrls, limit = 50) {
//   async function scrap(url, parent = null, baseUrl, visitedUrls) {
//   // try {
//   //   if (visitedUrls.size >= limit || visitedUrls.has(url)) {
//   //     return [];
//   //   }
//   try {
//     const absoluteUrl = new URL(url, baseUrl);
//     // console.log("absoluteUrl", absoluteUrl)
//     if (visitedUrls.includes(absoluteUrl.href)) {
//       console.log("Url length",visitedUrls.length)
//       return { url: absoluteUrl.href, status: 'skipped' };
//       // return ;
//     }
//     else{
//       visitedUrls.push(absoluteUrl.href);

    
// //     const absoluteUrl = new URL(url, baseUrl);
// // console.log("absoluteUrl", absoluteUrl)
//     // Append the absoluteUrl.href to the output.txt file
//     // fs.appendFileSync('output.txt', absoluteUrl.href + '\n');

//     // Save the scraped URL to the database
//     // console.log(visitedUrls.length);
//     await Base2.updateOne({ BASE_URL: baseUrl }, {
//       $push: { scrapedData: { url: visitedUrls, isChecked: false, timestamp: Date.now() } }
//     }, { upsert: true });

//     const response = await axios.get(absoluteUrl.href);
//     const $ = cheerio.load(response.data);

//     // global.childUrls = [];
//     $('a').each(async(index, element) => {
//       const href = $(element).attr('href');
//       if (href) {  
//         const childUrl = new URL(href, absoluteUrl);
//         // console.log("childurl", childUrl)
//         if (childUrl.hostname === baseUrl.hostname) {
//           // childUrls.push(childUrl.href);
//           await scrap(childUrl.href, absoluteUrl.href, baseUrl, visitedUrls);
//         }else{
//           return [];
//         }
//         // else{
//         //   // console.log(visitedUrls);
//         // }
//       }
//     });
//     console.log(visitedUrls.length)
//     // visitedUrls=[]
//     return [] ;}
//   } catch (error) {
//     return [];
//   }
// }

async function scrap(url, parent = null, baseUrl, visitedUrls) {
  try {
    const absoluteUrl = new URL(url, baseUrl);

    if (visitedUrls.includes(absoluteUrl.href)) {
      console.log("Url length", visitedUrls.length)
      return { url: absoluteUrl.href, status: 'skipped' };
    } else {
      visitedUrls.push(absoluteUrl.href);

      await Base2.updateOne({ BASE_URL: baseUrl }, {
        $push: { scrapedData: { url: absoluteUrl.href, isChecked: false, timestamp: Date.now() } }
      }, { upsert: true });

      const response = await axios.get(absoluteUrl.href);
      const $ = cheerio.load(response.data);

      let lastProcessedUrl = null;

      for (let i = 0; i < $('a').length; i++) {
        const element = $('a')[i];
        const href = $(element).attr('href');
        if (href) {
          const childUrl = new URL(href, absoluteUrl);
          if (childUrl.hostname === baseUrl.hostname) {
            lastProcessedUrl = await scrap(childUrl.href, absoluteUrl.href, baseUrl, visitedUrls);
          }
        }
      }

      console.log(visitedUrls.length)
      if (lastProcessedUrl) {
        return lastProcessedUrl;
      } else {
        return { url: absoluteUrl.href, status: 'processed' };
      }
    }
  } catch (error) {
    return { url: url, status: 'error' };
  }
}
const url = "https://quotes.toscrape.com/";
scrap(url, null, new URL(url), [])
  .then(result => console.log(result))
  .catch(error => console.error(error));


module.exports = scrap;

