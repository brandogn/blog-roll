const fs = require("fs");
const data = require("content.json");

console.log("Building pug");





fs.writeFile("bruh.html", "bruh", (err) => {
    if (err) throw err;
    console.log("File of : " + " was saved . . .");
})

