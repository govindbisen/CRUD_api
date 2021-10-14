// node can make command line tool
// servers can also be created using node
// express is popular framework on nodejs to make servers
// hapi is also available on nodejs to make servers.
// sails.js is also available to make servers

// ! The npm init command is a step-by-step tool to scaffold out your project.
// ? It will prompt you for input for a few aspects of the project
// * in the following order:
// Todo : orange

// npm install for creating whole node_module
// npm i express

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

// ! dont use import while you are not using module, "type": "module" in last line. package.json file. 
// ! const express = require('express') use this if you are not using module.

import express, { response } from "express";
const app = express();
const port = 3000;

//root
app.get("/", (req, res) => {
  res.send("Hello my server is running, nodemon is running!!");
});

// id is part of request id's user
app.get("/users/:id", (request, response) => {
  const id = request.params.id;

  console.log(request.params);
  console.log(request.params.id);

  response.send(users.filter((user) => user.id === id));
});

// app.get("/users",(request,response)=>{
//   response.send(users);
// })


// ? what i am doing ? I am trying to get whose age is greater than age we mentioned and or color yellow or anything either color or age that will be printed 

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
