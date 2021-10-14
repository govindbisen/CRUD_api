// os is inbuilt packages

const os = require("os");
console.log("Free Memory: " + os.freemem());
console.log("Total Memory :" + os.totalmem());
console.log(os.arch());

// fs file system
const  fs  = require("fs");
fs.readFile("./nice.txt","utf8", (err, data) => {
 console.log(data,"Shaktimaan!! 🖤💛");
});
