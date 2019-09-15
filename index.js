const ig = require('./instagram');

(async () => {

  await ig.initialize();

  await ig.login('qweqwe', 'qweqw');
  debugger;

})();