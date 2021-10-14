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


//using  fs sync 
const data = fs.readFileSync('./nice.txt','utf8');
console.log(data);
// first running before this remember because of the fact that the
// asynchronous call stack -> webapi -> callback queue -> eventloop checks for Call stack is empty or not....

//fs.copyFile("./nice.txt","good.txt",()=>console.log("File copied "));
fs.rename("./good.txt","Renamednice",()=>console.log("renamed"));

