const pug = require("pug");

// Compile the source code
const compiledFunction = pug.compileFile("template_home.pug");
const data = {
  title: "Timasdfsadfothy",
  links: { temp_page: "./template_page.html" },
};

// Render a set of data
console.log(
  compiledFunction({
    data: data,
  })
);
// "<p>Timothy's Pug source code!</p>"
