const mongoose = require('mongoose');

const scrapeSchema = new mongoose.Schema({
    title: String,
    link: String,
    likes: String,
    views: String,
    comments: String,
    date: String,
});

module.exports = scrapeSchema