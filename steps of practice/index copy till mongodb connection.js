// node can make command line tool
// servers can also be created using node
// express is popular framework on nodejs to make servers
// hapi is also available on nodejs to make servers.
// sails.js is also available to make servers

// ! The npm init command is a step-by-step tool to scaffold out your project.
// ? It will prompt you for input for a few aspects of the project
// * in the following order:
// Todo : orange

// npm install 
// for creating whole node_module
// npm i express
// npm install mongodb


const users = [
  {
    name: "Bear",
    pic: "https://images.unsplash.com/photo-1590488351142-010bc5059f7d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3RhZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    discription: "Halua poori",
    id: "2",
    age: 79,
    color: "yellow",
  },
  {
    name: "deer",
    pic: "https://images.unsplash.com/photo-1590488351142-010bc5059f7d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3RhZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    discription: ";<4`ai9=1Y",
    id: "5",
    age: 30,
    color: "red",
  },


  {
    name: "Kanha",
    pic: "https://i.pinimg.com/originals/a8/60/19/a8601981d84068e77feab917bf910564.jpg",
    discription: "HKT{;+S]&>",
    id: "6",
    age: 31,
    color: "yellow",
  },
  {
    name: "Elephant",
    pic: "https://files.worldwildlife.org/wwfcmsprod/images/African_Elephant_Kenya_112367/story_full_width/qxyqxqjtu_WW187785.jpg",
    discription: '1L-"26L$@%',
    id: "8",
    age: 32,
    color: "red",
  },
];

// ! dont use import while you are not using module, "type": "module" in last line of package.json file. 
// ! const express = require('express') use this if you are not using module.

import { MongoClient } from "mongodb";
async function createConnection(){
  const MONGO_URL = "mongodb+srv://govind:magic123@cluster0.szc6e.mongodb.net";
  const client = new MongoClient(MONGO_URL);
  await client.connect(); //other way is client.connect().then();
  // what we do for finding from database?  Db.collectionname.find({});
  console.log("successfully Connected");
  // ? to find inside blog_db inside blogs 
  // const users = await client.db("blog_db").collection("blogs").findOne({id:4});

  // ? this query is for insertion, inserted will return id of three items 
  //  const insertedid = await client.db("user").collection("people").insertMany([
  //   {
  //     name: "Bear",
  //     pic: "https://images.unsplash.com/photo-1590488351142-010bc5059f7d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3RhZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
  //     discription: "Halua poori",
  //     id: "2",
  //     age: 79,
  //     color: "yellow",
  //   },
  //   {
  //     name: "deer",
  //     pic: "https://images.unsplash.com/photo-1590488351142-010bc5059f7d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3RhZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
  //     discription: ";<4`ai9=1Y",
  //     id: "5",
  //     age: 30,
  //     color: "red",
  //   },
  
  
  //   {
  //     name: "Kanha",
  //     pic: "https://i.pinimg.com/originals/a8/60/19/a8601981d84068e77feab917bf910564.jpg",
  //     discription: "HKT{;+S]&>",
  //     id: "6",
  //     age: 31,
  //     color: "yellow",
  //   },
  //   {
  //     name: "Elephant",
  //     pic: "https://files.worldwildlife.org/wwfcmsprod/images/African_Elephant_Kenya_112367/story_full_width/qxyqxqjtu_WW187785.jpg",
  //     discription: '1L-"26L$@%',
  //     id: "8",
  //     age: 32,
  //     color: "red",
  //   },
  // ]);
  // console.log(insertedid);
  // const users = await client.db("blog_db").collection("blogs").findOne({id:4}); //* it is working 

  //  ? We need this findone by id when we want will give url by id. /users/id ... so we will put it there
  // ! this client should be available in those functions thats why we need to return it..
  // const personDetail = await client.db("user").collection("people").findOne({id:"5"});
  // console.log(personDetail);

  return client;
}

// returning client so we don't need create connection call thats why commenting 
// createConnection();


import express, { response } from "express";
const app = express();
const port = 3000;

//root
app.get("/", (req, res) => {
  res.send("Hello my server is running, nodemon is running!!");
});

// id is part of request id's user
app.get("/users/:id",async (request, response) => {
  /*
  ? these lines work when we dont have mongo db connections and data is local to our file.
  const id = request.params.id;
  console.log(request.params);
  console.log(request.params.id);
  response.send(users.filter((user) => user.id === id));
  */

  /*
  * now i will write query for mongo db with client because we want client we need to return that 
  */
 // * we need to provide client from create connection 
  const client = await createConnection();
// we need to read id from 
const { id } = request.params;
  const users = await client.db("user").collection("people").findOne({id:id});
  console.log(users);
  response.send(users);
});

// app.get("/users",(request,response)=>{
//   response.send(users);
// })


// ? what i am doing ? I am trying to get whose age is greater than age we mentioned and or color yellow or anything either color or age that will be printed 

app.get("/users", async (request, response) => {
  const { color, age } = request.query; // or const name = request.query.name
  console.log(request.query, color, age);
  const client = createConnection();
  const user = await (await client).db("user").collection("people").find({});
  console.log(users);
  response.send(users);
  /*
  ? find may not give as it is data, it may return curser because it is 20 per page data from mongodb 
  ! to convert ...find.toarray() it will return  whenever you get curser 

  */
});

/* 
* we don't need it for we are now using mongoDB...
app.get("/users", (request, response) => {
  const { color, age } = request.query; // or const name = request.query.name
  console.log(request.query, color, age);
  if (!color && !age) {
    response.send(users);
  } else if (color && !age) {
    response.send(users.filter((user) => user.color === color));
  } else if (!color && age) {
    response.send(users.filter((user) => user.age > age));
  }
  else{
    response.send(users.filter((user)=>user.color ===color && user.age>age))
  }
});
*/


app.listen(process.env.PORT || port, () => {
  console.log(`server App listening at http://localhost:${port}`);
});

// ? delete
// ? get : get al data
// ? put : all other will null if we update only one data among many
// ? patch : it is real update to only necessary and keep all other data as it is
// ? post : post data to server

//* http://localhost:3000/users?name=deer
//* http://localhost:3000/users?name=deer&age=25
//* try apply multiple query else return all users ...
//*  user/:id?query&color=orange ... these things are called query parameter
//* key=value&key2=value2&key3=value3&key4=value4&key5=value5... these kind of work ...filtering happens

  // ? this query is for insertion, inserted will return id of three items if db or collection do not exist it will create one...
//   const inserted = await client.db("products").collection("items").insertMany( [
//     { item: "card", qty: 15 },
//     { item: "envelope", qty: 20 },
//     { item: "stamps" , qty: 30 }
//  ] );