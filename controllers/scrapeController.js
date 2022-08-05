const puppeteer = require('puppeteer');

const scrapeController = {
    scrapeSquare: async (req, res) => {
        try {
            const { url } = req.body;

            // terminate scraping if url not provided
            if (!url) {
                return res.status(400).json({
                    msg: 'URL not provided'
                });
            }

            // checks to ensure if the url exists before scraping
            // const exists = await urlExists(url);
            //
            // if (!exists) {
            //     return res.status(404).json({
            //         msg : 'URL does not exist'
            //     })
            // }

            // initialize the browser
            const browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox','--disable-setuid-sandbox']
            });

            // open the webpage and begin scraping
            const page = await browser.newPage();
            await page.goto(url);
            await page.waitForSelector('.subtotal-line-item-price');

            // total amount to pay the merchant
            const tAmount = await page.evaluate(() => {
                // eslint-disable-next-line no-undef
                const ams = document.body.querySelectorAll(
                    '.subtotal-line-item-price'
                );
                return ams[2].textContent.trim();
            });

            // merchant's name
            await page.waitForSelector('.header span');
            const mName = await page.evaluate(() => {
                // eslint-disable-next-line no-undef
                const result = document.body.querySelector('.header span');
                return result.textContent.trim();
            });

            // click the accordion that contains the order details
            await page.click('.checkout-section-toggle-icon');

            // item names
            await page.waitForSelector('.cart-item__name');

            const names = await page.evaluate(() => {
                // eslint-disable-next-line no-undef
                const ns = document.body.querySelectorAll('.cart-item__name');
                const result = [];
                const keys = Object.keys(ns);
                keys.forEach(function (key) {
                    result.push(ns[key].textContent.trim());
                });
                return result;
            });

            // item prices
            await page.waitForSelector('.cart-item__price');

            const prices = await page.evaluate(() => {
                // eslint-disable-next-line no-undef
                const ps = document.body.querySelectorAll('.cart-item__price');
                const result = [];
                const keys = Object.keys(ps);

                keys.forEach(function (key) {
                    result.push(ps[key].textContent.trim());
                });
                return result;
            });

            // item quantities
            await page.waitForSelector('.cart-item__quantity-readonly');

            const quantities = await page.evaluate(() => {
                // eslint-disable-next-line no-undef
                const qs = document.body.querySelectorAll(
                    '.cart-item__quantity-readonly'
                );
                const result = [];
                const keys = Object.keys(qs);

                keys.forEach(function (key) {
                    result.push(
                        parseInt(qs[key].textContent.trim().substring(4))
                    );
                });
                return result;
            });

            return res.status(200).json({
                merchantName : mName,
                totalAmount: tAmount,
                itemNames: names,
                itemPrices: prices,
                itemQuantities: quantities
            });
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            });
        }
    }
};

module.exports = scrapeController;
