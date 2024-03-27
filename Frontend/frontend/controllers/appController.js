const URLsModel = require('../models/urls');
const ScrapedDataModel = require('../models/scrapedData');

const urlsModel = new URLsModel();
const scrapedDataModel = new ScrapedDataModel();

const AppController = {
  async scrapeURLs(url) {
    return await urlsModel.fetchData(url);
  },

  async scrapeData(selectors) {
    return await scrapedDataModel.scrapeData(selectors);
  },

  // Add other controller methods as needed
};

module.exports = AppController;
