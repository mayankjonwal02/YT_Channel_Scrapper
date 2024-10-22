const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://admin:password@mongo:27017/scraped_data', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'admin'
    });
    console.log('--------------MongoDB connected--------------');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with failure
  }
}

module.exports = connectDB;