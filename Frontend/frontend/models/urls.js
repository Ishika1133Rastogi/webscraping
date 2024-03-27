const axios = require('axios');

class URLsModel {
  constructor() {
    this.urls = [];
  }

  async fetchData(url) {
    try {
      const response = await axios.get(`http://localhost:5002/api/search?BASE_URL=${url.trim()}`);
      this.urls = Array.from(response.data.scrapedData) || [];
      return this.urls;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }

  // Add other methods as needed
}

module.exports = URLsModel;
