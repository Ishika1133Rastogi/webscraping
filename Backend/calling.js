const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const scrap = require("./scraper1");
const mongoose = require("mongoose");
const Base = require("./model/Selector");
const Quote = require("./model/quote");
const axios = require("axios");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
PORT = process.env.PORT || 5002;
const DB = process.env.DATABASE;
app.use(bodyParser.json());
const fs = require("fs");
const { URL } = require("url");
const cheerio = require("cheerio");
// var heapdump = require('heapdump');
let globalBaseUrl = "";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({ h: "11" });
  }
  next();
});



//DATABASE
try {
  mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  Date;
  console.log(`✅ Connected to database`);
} catch (error) {
  console.log(`❌ Error connecting to database: ${DB}`, error);
}

const updateScrapedDataItem = async (itemId, isChecked) => {
  try {
    const result = await Base.findOneAndUpdate(
      { "scrapedData._id": itemId },
      {
        $set: {
          "scrapedData.$.isChecked": isChecked,
          "scrapedData.$.timestamp": isChecked ? Date.now() : null,
        },
      },
      { new: true }
    );
  } catch (error) {
    console.error("Error updating document:", error);
  }
};
let baseUrl;
app.get("/api/search", async (req, res) => {
  baseUrl = req.query.BASE_URL;

  try {
    let doc = await Base.findOne({ BASE_URL: baseUrl });
    if (!doc) {
      const timeset = setTimeout(() => {
      fs.readFile("output.txt", "utf8", async (err, data) => {
        if (err) {
          console.error("Error reading output file:", err);
          return res.status(500).json({ error: "Error reading output file" });
        }
        const urls = data.split("\n").filter(Boolean);
        // Extract the first URL as BASE_URL
        const BASE_URL = urls.shift().trim();
        // Create a new document with BASE_URL and scrapedData
        const newBase = new Base({
          BASE_URL,
          scrapedData: urls.map((url) => ({ url: url.trim() })),
        });
        // Save the new document to MongoDB
        try {
          await newBase.save();
          console.log("Data saved to MongoDB");
          return res.status(200).json(newBase); // Return the newly created document
        } catch (error) {
          console.error("Error saving data to MongoDB:", error);
          return res
            .status(500)
            .json({ error: "Error saving data to MongoDB" });
        }
      });
    }, 35000);
    clearTimeout(timeset);
    } else {
      return res.status(200).json(doc); // Return the existing document
    }
  } catch (error) {
    console.error("Error searching for document:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//SCRAPER API CALL FOR FIRST STEP
app.post("/scrape", async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }
  try {
    
    // fs.readFileSync("output.txt", "");
    // fs.writeFileSync("output.txt", "");
    // globalBaseUrl = url;
    console.log("123")
    const urls2 = scrap(url, null, new URL(url), []);
   
    return res.status(200).json({ "urls2":urls2 });
  } catch (error) {
    console.error("Error scraping UR2L:", url, error);
    return res
      .status(500)
      .json({ error: "An error occurred while scraping URL" });
  }
});

let urls;
app.put("/api/update-ischecked", async (req, res) => {
  const url = req.body.url;
  const id = req.body.id;
  const isChecked = req.body.isChecked;
  const urlsArray = req.body.urlsArray;
  urls = urlsArray;

  try {
    updateScrapedDataItem(id, isChecked);
    res.status(200).json({
      success: "123",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

global.selectors = [];
app.post("/scrapes", (req, res) => {
  const { selector } = req.body;
  console.log("selector123", selector)
  selectors.push(selector);
  console.log("selector array", selectors)
  res.json({ message: "Selector added successfully" });
});

async function scrapeData(url, selector) {
  try {
    const response = await axios.get(url);
    let pages = [];
    const $ = cheerio.load(response.data);
    let pageData = {};
    selector.forEach((selector) => {
      let values = [];
      $(selector).each((index, element) => {
        values.push($(element).text().trim());
      });
      pageData[selector] = values;
    });

    pages.push(pageData);
    return pages;
  } catch (error) {
    console.error("Error scraping URL:", url, error);
    return null;
  }
}

// console.log("heapdump2", process.memoryUsage());
app.post("/scrape-data", async (req, res) => {
  const myUrls=req.body.urlsArray;
  console.log(myUrls)
  if (!urls.length || !selectors.length) {
    return res.status(400).json({ error: "No URLs or selectors found" });
  }
  const scrapedData = [];
  for (let i = 0; i < urls.length && i < selectors.length; i++) {
    const url = urls[i];
    const selector = selectors[i];
   console.log("selector", selector)
    const data = await scrapeData(url, selector);
    console.log("data", data)
    if (data) {
      scrapedData.push({ url, data });
    }
  }
  // console.log("heapdump1", process.memoryUsage());
selectors=[]
  const output = JSON.stringify(scrapedData, null, 2); // Use null and 2 for pretty printing
  fs.writeFileSync("text1.txt", output, "utf-8");
  res.json({ message: "Scraping completed successfully", data: scrapedData });

  fs.readFile("text1.txt", "utf8", async (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    try {
      const jsonData = JSON.parse(data);

      if (!Array.isArray(jsonData)) {
        console.error("Invalid data format: JSON data is not an array");
        return;
      }

      for (const item of jsonData) {
        const { url, data: dataArray } = item;

        const formattedData = dataArray.flatMap((obj) => {
          return Object.entries(obj).map(([selector, values]) => ({
            selector,
            values,
          }));
        });
        try {
          // Find the document with the given BaseUrl
          const existingDoc = await Quote.findOne({ BaseUrl: globalBaseUrl });

          if (existingDoc) {
            // If the document exists, update its selectorData
            existingDoc.selectorData.push({ url, data: formattedData });
            await existingDoc.save();
          } else {
            // If the document does not exist, create a new document
            await Quote.create({
              BaseUrl: globalBaseUrl,
              selectorData: [{ url, data: formattedData }],
            });
          }
        } catch (error) {
          console.error(`Error updating/saving data for URL '${url}':`, error);
        }
      }
    } catch (error) {
      console.error("Error parsing JSON data:", error);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// console.log("heapdump", process.memoryUsage());
