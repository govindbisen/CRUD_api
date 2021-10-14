// node can make command line tool
// servers can also be created using node
// express is popular framework on nodejs to make servers
// hapi is also available on nodejs to make servers.
// sails.js is also available to make servers

/* 
* ! The npm init command is a step-by-step tool to scaffold out your project. 
* ? It will prompt you for input for a few aspects of the project 
 in the following order:

npm install for creating whole node_module
npm i express 
* const express = require("express"); before "type" :"module"
*/


const express = require("express");
const app = express();
const port = 3000;

//root
app.get("/", (req, res) => {
  res.send("Hello my server is running nodemon is running!!");
});

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

