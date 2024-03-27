const axios = require('axios');

class ScrapedDataModel {
  constructor() {
    this.scrapedData = [];
  }

  async scrapeData(selectors) {
    try {
      const response = await axios.post('http://localhost:5002/scrape-data', { selectors });
      this.scrapedData = Array.from(response.data);
      return this.scrapedData;
    } catch (error) {
      console.error('Error scraping data:', error);
      return [];
    }
  }

  // Add other methods as needed
}

module.exports = ScrapedDataModel;
