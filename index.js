const ig = require('./instagram');
const logins = require('./passwords');

(async () => {

  await ig.initialize();

  await ig.login(logins.logins.login, logins.logins.password);

  await ig.likeTagsProcess(['javascript', 'nodejs', 'tech', 'frontend', 'backend', 'frontenddeveloper', 'programista', 'testing', 'helloworld']);

  debugger;

})();