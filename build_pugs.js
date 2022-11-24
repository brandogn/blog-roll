// LOAD FILES:
const fs = require("fs");
const path = require("path");
const pug = require("pug");
// PUG TEMPLATE FUNCTIONS:
const pageTemplate = pug.compileFile("template_page.pug");
const homeTemplate = pug.compileFile("template_home.pug");
// FILE DIRECTORY
const content = require("./content.json");
const OUT = path.join(__dirname, "docs");

console.log("creating files in: " + OUT);

function dirStructure() {
  let buffer = {};
  for (const key in content) {
    dirs = Object.keys(content[key]);
    buffer[key] = dirs.map((name) => {
      return { name: name, url: path.join("/", key, name + ".html") };
    });
  }
  return buffer;
}

const globalNav = dirStructure();
console.log(globalNav);

function createHome(title, links) {
  return homeTemplate({
    data: {
      navInfo: globalNav,
      title: title,
      links: links,
    },
  });
}

function createPage(title, content, homeLink) {
  return pageTemplate({
    data: {
      navInfo: globalNav,
      title: title,
      content: content,
      home: homeLink,
    },
  });
}

///
///
///

function main() {
  // Create index:
  const indexHTML = pug.renderFile("template_index.pug", {
    data: { navInfo: globalNav },
  });
  fs.writeFileSync("./docs/index.html", indexHTML);

  // Create File Structure:
  for (const proj in content) {
    // Setup project directory
    const projDir = path.join(OUT, proj);
    fs.rmSync(projDir, { recursive: true, force: true }, (err) => {});
    fs.mkdirSync(projDir);

    // Set up home.html page
    const homeHtml = createHome(`Project ${proj}`, globalNav[proj]);
    fs.writeFileSync(path.join(projDir, "home.html"), homeHtml);

    // Set up subpages iteratively
    console.log(content[proj]);
    for (const page in content[proj]) {
      const pageHtml = createPage(page, content[proj][page], {
        name: proj,
        url: `/${proj}/home.html`,
      });
      fs.writeFileSync(path.join(projDir, `/${page}.html`), pageHtml);
    }
  }
}
main();

// DEBUG:

function debug() {}
debug();

// pug ./ -wo ./docs -P
