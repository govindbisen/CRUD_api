// const express = require('express');
// npm install express mongodb dotenv ...
import dotenv from 'dotenv';
dotenv.config(); 

import { MongoClient } from "mongodb";
async function createConnection(){
  const MONGO_URL = process.env.MONGO_URL;
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("connection to mongoDB established!!");
  return client;
}

import express from "express";
const app = express();
const PORT = process.env.PORT;
app.get("/", (request, response) => {
  response.send("server is up and running!! ");
});

app.get("/allusers", (request, response) => {
  response.send(users);
});

app.get("/users/:id", async (request, response) => {
  const client = await createConnection();
  const { id } = request.params;
  const result = await client.db("userDB").collection('people').find({id:id}).toArray();
  response.send(result);
});

// ! http://localhost:3000/users?color=red&age=32

app.get("/users", async (request, response) => {
  const { color } = request.query;
  const { age } = request.query;
  
  const client = await createConnection();

  if(!color&&!age){
    const result = await client.db("userDB").collection('people').find({} ).toArray(); //color: color, age: { $gt: age }
    response.send(result);
  }
 else if(color&&!age){
  const result = await client.db("userDB").collection('people').find({color:color}).toArray(); //color: color, age: { $gt: age }
  response.send(result);

  }
  else if(!color&&age){
    const result = await client.db("userDB").collection('people').find({age:{$gt:age}} ).toArray(); //color: color, age: { $gt: age }
    response.send(result);
  }
  else{
    const result = await client.db("userDB").collection('people').find({} ).toArray(); //color: color, age: { $gt: age }
    response.send(result);
  }
});


app.use(express.json()); // otherwise console in post will give undefined because it do not know which kind of data 

app.post("/users", async (request, response) => {
  const client = await createConnection();
  console.log(request.body);
  
  const result = await client.db("userDB").collection('people').insertMany(request.body);
  response.send(result);
});



app.delete("/users/:id", async (request, response) => {
  const client = await createConnection();
  const { id } = request.params;
  const result = await client.db("userDB").collection('people').deleteOne({id:id});
  response.send(result);
});

app.patch("/users/:id", async (request, response) => {
  const client = await createConnection();
  const { id } = request.params;
  const result = await client.db("userDB").collection('people').updateOne({id:id},{$set:request.body});
  response.send(result);
  console.log(result);
});





app.listen(PORT, () => console.log("localhost:" + PORT));
