import fs from "fs";

const log = (message) => {
  console.log(`************${message}************`);
};

const readJSONFile = (fileName) => {
  return JSON.parse(fs.readFileSync(`./data/${fileName}.json`));
};

const writeJSONFile = (fileName, data) => {
  return fs.writeFileSync(`./data/${fileName}.json`, JSON.stringify(data));
};

export { log, readJSONFile, writeJSONFile };
