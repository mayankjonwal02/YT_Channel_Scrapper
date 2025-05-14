
# 📺 YouTube Channel Scraper

A web scraper built with **Express.js** and **Puppeteer** that allows you to fetch metadata, videos, and statistics from YouTube channels. This project is designed to help you analyze and gather data from YouTube creators’ channels for research, content planning, or data collection purposes.

---

## 🎯 Project Overview

This scraper connects to YouTube, extracts various details about a channel, and returns information like:

- Channel title, description, and banner image
- A list of recent videos with metadata (e.g., title, views, upload date)
- Video stats like likes, comments, and watch time
- Channel statistics (e.g., subscriber count, total views)

The data is scraped using **Puppeteer**, a headless browser automation framework, and served via an **Express.js** backend.

---

## 🛠️ Tech Stack

| Layer      | Technology          |
|------------|---------------------|
| Backend    | Express.js          |
| Web Scraping| Puppeteer (headless Chrome) |
| Database   | Optional (can be integrated for storing data) |
| Deployment | Heroku / Docker (optional) |

---

## ⚡ Features

- 📊 Scrape channel info (title, description, banner, etc.)
- 🎬 Fetch video data (titles, views, upload dates)
- 📈 Retrieve channel stats (subscribers, total views)
- 🚀 Fast and efficient scraping using Puppeteer
- 🖥️ RESTful API to interact with the scraper

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/youtube-channel-scraper.git
cd youtube-channel-scraper
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Server

```bash
npm start
```

This will start the Express server on `http://localhost:3000`.

---



---

## 📡 API Endpoints

### `/api/scrape-channel` (POST)

Fetches information for a given YouTube channel.

**Request Body:**

```json
{
  "channelUrl": "https://www.youtube.com/c/CHANNEL_NAME"
}
```

**Response:**

```json
{
  "channelInfo": {
    "title": "CHANNEL_NAME",
    "description": "Channel description here...",
    "bannerImage": "https://linktobanner.com",
    "subscriberCount": "1M",
    "totalViews": "100M"
  },
  "videos": [
    {
      "title": "Video Title",
      "views": "1M",
      "uploadDate": "2021-01-01",
      "url": "https://youtube.com/watch?v=VIDEO_ID"
    },
    ...
  ]
}
```

---

## 🌍 Deployment

You can deploy this project to a cloud platform like **Heroku** or **DigitalOcean** or use **Docker** for containerized deployment.

### Docker Deployment

```bash
docker build -t youtube-channel-scraper .
docker run -p 3000:3000 youtube-channel-scraper
```

---

## 🧑‍💻 Developed By

**Mayank Jonwal**
B.Tech AI & Data Science, IIT Jodhpur

[LinkedIn](https://www.linkedin.com/in/mayankjonwal) • [GitHub](https://github.com/<your-username>)

---


