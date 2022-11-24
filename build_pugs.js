// LOAD FILES:
const fs = require("fs");
const path = require("path")
const pug = require("pug");
// PUG TEMPLATE FUNCTIONS:
const pageTemplate = pug.compileFile("template_page.pug");
const homeTemplate = pug.compileFile("template_home.pug");
// FILE DIRECTORY
const content = require("./content.json");
const OUT = path.join(__dirname, "docs")
console.log(OUT);

console.log("created compiled funcitons");

// object with key as project title, val as array of link objects

function writeFile(path, data) {
  fs.writeFile(path, data, (err) => {
    if (err) throw err;
    console.log("\tFile at " + path + " was saved . . .");
  });
}

function makeDir(path) {
  fs.mkdir(path, (err) => {
    if (err) throw err;
    console.log("\tDirectory created at " + path + ". . .");
  });
}

function getDirectory() {
  let buffer = {};
  for (const key in content) {
    dirs = Object.keys(content[key]);
    buffer[key] = dirs.map((name, folder) => {
      return { name: name, url: `./${name}` };
    });
  }
  return buffer;
}

const globalNav = getDirectory();

function createHome(title, links) {
  return homeTemplate({
    data: {
      navInfo: globalNav,
      title: title,
      links: links,
    },
  });
}

///
///
///

function main() {
  // console.log(content);
  for (const proj in content) {
    makeDir("./docs/" + proj);
    writeFile("./docs/" + proj + "/home.html", "")
    for (const page in content[proj]) {
      writeFile("./docs/" + proj + `/${page}.html`, "")
    }
  }
}
main();

// DEBUG:

// function debug() {
//   const renderedHTML = pug.renderFile("template_index.pug", {
//     data: { navInfo: globalNav },
//   });
//   // const renderedHTML = createHome("THIS IS A TEST", { name: "#", deasdf: "#" });
//   // console.log(renderedHTML);

//   writeFile("./docs/index.html", renderedHTML);
// }
// debug();

// pug ./ -wo ./docs -P
