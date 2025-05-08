const fs = require("fs");
const path = require("path");
const util = require("util");

const readdir = util.promisify(fs.readdir);
const lstat = util.promisify(fs.lstat);

const dirTraverse = async (dirname) => {
  try {
    const files = await readdir(dirname);
    for (const file of files) {
      const fpath = path.join(dirname, file);
      const stats = await lstat(fpath);
      if (stats.isDirectory()) {
        await dirTraverse(fpath);
      } else if (path.extname(fpath) === ".js") {
        console.log(fpath);
      }
    }
  } catch (err) {
    console.error("Error reading directory:", err);
  }
};

dirTraverse("./test");
