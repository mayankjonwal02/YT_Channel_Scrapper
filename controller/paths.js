const express = require('express');
const router = express.Router();
const Scrape = require('../service/Scrape');



router.post('/scrape', Scrape);

module.exports = router;