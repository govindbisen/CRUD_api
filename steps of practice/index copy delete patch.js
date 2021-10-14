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

// npm install dotenv
// import dotenv from 'dotenv';
// dotenv.config();

import { MongoClient } from "mongodb";
async function createConnection() {
  const MONGO_URL = "mongodb+srv://govind:magic123@cluster0.szc6e.mongodb.net";
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("successfully Connected");
  return client;
}

import express, { response } from "express";
const app = express();
const port = 3000;

// ! what kind of data we are going to get ?
// middleware is the one who cnd do that conversion etc...
app.use(express.json()); // all the request- body- will be converted to json
// express.json() is inbuilt middleware
// there are third pary(we can import ) and custom middleware(we can write) also ...

app.get("/", (req, res) => {
  res.send("Hello my server is running, nodemon is running!!");
});

app.get("/users/:id", async (request, response) => {
  const client = await createConnection();
  const { id } = request.params;
  const users = await client
    .db("user")
    .collection("people")
    .findOne({ id: id });
  console.log(users);
  response.send(users);
});

app.get("/users", async (request, response) => {
  const client = createConnection();
  const users = await client.db("user").collection("people").find({});
   response.send(users);
});

// app.get("/users", async (request, response) => {
//   const { color, age } = request.query; // or const color = request.query.color
//   console.log(request.query, color, age);
//   const client = createConnection();
//   const user = await client.db("user").collection("people").find({});
//   console.log(users);
//   response.send(users);
// });

app.post("/users", async (request, response) => {
  const client = createConnection();
  const addUser = request.body;
  const result = await client
    .db("user")
    .collection("people")
    .insertMany(addUser);
  response.send(result);
  console.log(addUser, result);
});

app.delete("/users/:id", async (request, response) => {
  const client = await createConnection();
  const { id } = request.params;
  const user = await client
    .db("user")
    .collection("people")
    .deleteOne({ id: id });
  console.log(user);
  response.send(user);
});

app.patch("/user/:id", async (request, response) => {
  console.log(request.params);
  const { id } = request.params;
  const client = await createConnection();
  const newData = request.body;
  console.log(request.body);
  const userUpdated = await client
    .db("user")
    .collection("people")
    .updateOne({ id: id }, { $set: newData });
  console.log(userUpdated);
  response.send(userUpdated);
});

app.listen(process.env.PORT || port, () => {
  console.log(`server App listening at http://localhost:${port}`);
});

// ! **************** steps comment started **************
// TODO WORK : Post man with mongo db
// create
// read
// update
// delete

// Request : From Client to Server
// Response: From Server to Client
// Server: Receive Request and Send Response
// Client: Send Request and Receive Response

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

// app.post("/users", async (request, response) => {
//   const client = createConnection();
//   console.log(request.body);
// });
// ! this will give undefined because express do not understand what type of data it is getting...
// ! for this we use middleware.
