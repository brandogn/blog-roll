const pug = require("pug");

// Compile the source code
const compiledFunction = pug.compileFile("test.pug");
const data = { bruh: "Timasdfsadfothy" };

// Render a set of data
console.log(
  compiledFunction({
    data: data,
  })
);
// "<p>Timothy's Pug source code!</p>"
