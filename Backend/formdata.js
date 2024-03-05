const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs').promises;

const scrapedate = async () => {
    try {
        const response = await axios.request({
            method: "GET",
            url: "https://www.webscraper.io/test-sites/e-commerce/allinone"
        });

        const html = response.data;
        const $ = cheerio.load(html);

        // Extracting URLs
        const urls = [];
        $('a').each((index, element) => {
            urls.push($(element).attr('href'));
        });

        // Extracting website titles
        const websitetitle = [];
        $('div.wrapper').each((index, el) => {
            const game = $(el);
            const title = game.find('title').text();
            websitetitle.push(title);
        });

        return { urls, websitetitle };
    } catch (err) {
        console.log(err);
        return { urls: [], websitetitle: [] };
    }
};

scrapedate().then(async (data) => {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        await fs.writeFile('data.json', jsonData);
        console.log('Data saved to data.json');
    } catch (error) {
        console.error('Error saving data to data.json:', error);
    }
});
