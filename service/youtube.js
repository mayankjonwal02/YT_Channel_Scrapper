const puppeteer = require('puppeteer');

async function get_channel_data(url_to_check) {
    const browser = await puppeteer.launch({headless: true,
        executablePath: '/usr/bin/google-chrome',
        args: ['--no-sandbox'],
    });
    
    const page = await browser.newPage();
    await page.setViewport({width: 1366, height: 768});
    await page.goto(url_to_check, { waitUntil: 'networkidle2' });

    // Wait for the tab to be clickable and then click it
    await page.waitForSelector("#tabsContent > yt-tab-group-shape > div.yt-tab-group-shape-wiz__tabs > yt-tab-shape:nth-child(2)", { visible: true });
    await page.click("#tabsContent > yt-tab-group-shape > div.yt-tab-group-shape-wiz__tabs > yt-tab-shape:nth-child(2)");

    // Wait for the contents to load after clicking
    await page.waitForSelector("#contents ytd-rich-item-renderer", { visible: true });

    // Extract all h3 elements and their corresponding links
    const videoInfo = await page.evaluate(() => {
        const items = document.querySelectorAll('#contents ytd-rich-item-renderer');
        return Array.from(items).map(item => {
            const h3 = item.querySelector('#content ytd-rich-grid-media #dismissible #details #meta h3');
            const a = item.querySelector('#content ytd-rich-grid-media #dismissible ytd-thumbnail a#thumbnail');
            return {
                title: h3 ? h3.textContent.trim() : null,
                link: a ? 'https://www.youtube.com' + a.getAttribute('href') : null
            };
        }).filter(info => info.title !== null && info.link !== null);
    });

    // Function to extract details from a single video page
    async function getVideoDetails(url) {
        const newpage = await browser.newPage();
        newpage.setViewport({width: 1366, height: 768});
        await newpage.goto(url, { waitUntil: 'networkidle2' });
        await newpage.waitForSelector("#above-the-fold #title");
        await newpage.waitForSelector("#description")
        await newpage.click("#expand")

        const details = await newpage.evaluate(() => {
            
            return {
                title: document.querySelector("#title > h1 > yt-formatted-string").innerText,
                likes: document.querySelector("#top-level-buttons-computed > segmented-like-dislike-button-view-model > yt-smartimation > div > div > like-button-view-model > toggle-button-view-model > button-view-model > button > div.yt-spec-button-shape-next__button-text-content").innerText,
                views: document.querySelector("#info > span:nth-child(1)").innerText,
                date: document.querySelector("#info > span:nth-child(3)").innerText,
                

                description: document.querySelector("#description-inline-expander > yt-attributed-string > span").innerText
            };
        });

        await newpage.close();
        return details;
    }

    // Use Promise.all to fetch details for all videos concurrently
    const detailedVideoInfo = await Promise.all(
        videoInfo.map(async (video) => {
            if (video.link) {
                const details = await getVideoDetails(video.link);
                return { ...video, ...details };
            }
            return video;
        })
    );

    console.log('Detailed video info:', detailedVideoInfo);

    await browser.close();
    return detailedVideoInfo;
}

module.exports = get_channel_data;

// get_channel_data("https://www.youtube.com/@lonelybeatsmusic")
//     .then(result => console.log('Final result:', result))
//     .catch(error => console.error('An error occurred:', error));