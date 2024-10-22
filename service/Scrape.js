const getChannelData = require('./youtube');
const mongoose = require('mongoose');
const ScrapeEntity = require('../entity/Scrape_Entity');

const scrape = async (req, res) => {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    
    try {
      const data = await getChannelData(url);
      const DB = mongoose.connection;
      const ScrapeModel = DB.model('Scrape', ScrapeEntity);
      
      await Promise.all(data.map(async (item) => {
        try {
          const existingItem = await ScrapeModel.findOne({ link: item.link });
          if (existingItem) {
            // If item exists, update it
            Object.assign(existingItem, item);
            await existingItem.save();
          } else {
            // If item doesn't exist, create a new one
            await ScrapeModel.create(item);
          }
        } catch (itemError) {
          console.error(`Error processing item ${item.link}:`, itemError);
          // You might want to handle this error, e.g., by adding it to an errors array
        }
      }));
      
      // Return the original data as requested
      return res.json({ data });
    } catch (error) {
      console.error('Error scraping YouTube:', error);
      return res.status(500).json({ error: 'Error scraping YouTube', details: error.message });
    }
  }

module.exports = scrape;