const puppeteer = require('puppeteer');

const BASE_URL = 'https://instagram.com';
const TAG_URL = (tag) => `https://www.instagram.com/explore/tags/${tag}/`;

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

    // await instagram.page.waitForNavigation({ waitUntil: 'networkidle2' });

    await instagram.page.waitFor(1000);

    //typing username and pass
    await instagram.page.type('input[name="username"]', username, { delay: 50 });
    await instagram.page.type('input[name="password"]', password, { delay: 50 });


    // login btn

    loginButton = await instagram.page.$x('//div[contains(text(), "Zaloguj się")]');
    await loginButton[0].click();

    await instagram.page.waitFor(10000);
    await instagram.page.waitFor('a > span[aria-label="Profil"')
  },

  likeTagsProcess: async (tags = []) => {

    for(let tag of tags) {
      // go to tag page

      await instagram.page.goto(TAG_URL(tag), { waitUntil: 'networkidle2' });
      await instagram.page.waitFor(1000);

      let posts = await instagram.page.$$('article > div:nth-child(3) img[decoding="auto"]');

      for(let i = 0; i < 3; i++) {

        let post = posts[i];

        // click on post

        await post.click();
        await instagram.page.waitFor('span[id="react-root"][aria-hidden="true"]');
        await instagram.page.waitFor(1000);

        let isLikeable = await instagram.page.$('span[aria-label="Lubię to!"]');

        if(isLikeable) {
          await instagram.page.click('span[aria-label="Lubię to!"]');
        }

        await instagram.page.waitFor(3000);

        // close post
        let closeModalButton = await instagram.page.$x('//button[contains(text(), "Zamknij")]');
        await closeModalButton[0].click();


        await instagram.page.waitFor(1000);
      }

      await instagram.page.waitFor(10000);

    }

  }
};

module.exports = instagram;