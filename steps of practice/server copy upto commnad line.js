console.log("up and running");
// // 1 maximum mark from array
// const marks = [40,50,10,80,30];
// console.log(Math.max(...marks));

// 2 few objects not available in node 
// winndows not available, DOM not available, set timeout is inside global object unline windows on browser
//console.log(global);

// to crate creat package.json
// to run node server.js 
// to dev nodemon and file change inside package.json

// npm init

// 3 command line apps can be created by us in nodejs

function double(num){
    return num*2;
}
//console.log( " Double of numbe:" + double(5));//
console.log("arguments : "+process.argv);
const num = process.argv[2];
console.log( "Double of number:" + double(num));
// process.argv is array it is inbuilt in nodejs
// > node server.js 30 will give 60




