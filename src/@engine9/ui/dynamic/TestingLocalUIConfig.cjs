const fs = require('node:fs');
// eslint-disable-next-line import/no-unresolved
const UIWorker = require('../../../../../engine9-server/workers/UIWorker');

(async () => {
  const worker = new UIWorker();

  const config = await worker.getConsoleConfigString({ accountId: 'dev' });
  const s = `/* eslint-disable indent */
  export default function useLocalUI() {
  return JSON.parse(JSON.stringify(${config}));
  }\n`;
  fs.writeFileSync(`${__dirname}/TestingLocalUIConfig.jsx`, s);
})();
