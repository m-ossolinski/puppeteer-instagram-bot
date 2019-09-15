const puppeteer = require('puppeteer');

const BASE_URL = 'https://instagram.com';

const instagram = {
  browser: null,
  page: null,

  initialize: async () => {
    instagram.browser = await puppeteer.launch({
      headless: false
    });

    instagram.page = await instagram.browser.newPage();

    await instagram.page.goto(BASE_URL, { waitUntil: 'networkidle2' });

  },

  login: async (username, password) => {

    await instagram.page.goto(BASE_URL, { waitUntil: 'networkidle2' });

    let loginButton = await instagram.page.$x('//a[contains(text(), "Zaloguj się")]');

     // click login btn
    await loginButton[0].click();

    await instagram.page.waitForNavigation({ waitUntil: 'networkidle2' });

    await instagram.page.waitFor(1000);

    //typing username and pass
    await instagram.page.type('input[name="username"]', username, { delay: 50 });
    await instagram.page.type('input[name="password"]', password, { delay: 50 });

    debugger;

  }
};

module.exports = instagram;