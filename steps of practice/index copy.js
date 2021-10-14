// const express = require('express');

const users = [
  { id: "1", Name: "Govind", Age: 32, Color: "red" },
  { id: "2", Name: "Dimit", Age: 32, Color: "Blue" },
  { id: "3", Name: "Jennifer", Age: 33, Color: "White" },
];

import express from "express";
const app = express();
const PORT = 3000;
app.get("/", (request, response) => {
  response.send("server is up and running!! ");
});

app.get("/allusers", (request, response) => {
  response.send(users);
});

app.get("/users/:id", (request, response) => {
  const { id } = request.params;
  response.send(users.filter((user) => user.id === id));
});

// ! http://localhost:3000/users?color=red&age=32

app.get("/users", (request, response) => {
  const { color } = request.query;
  const { age } = request.query;
  //response.send({"age":age,"color":color});
  if (!age && !color) {
    response.send(users);
  } else if (age && !color) {
    response.send(users.filter((user)=>user.Age===age));
  } else  {
    response.send(users.filter((user)=>user.Color===color));
  }
});

app.listen(PORT, () => console.log("localhost:" + PORT));
