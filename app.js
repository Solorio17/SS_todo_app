const express = require("express"),
      path    = require("path"),
      bodyParser = require("body-parser");

//INIT APP
const app = express();

const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const url = "mongodb://localhost:27017/todo_app";

//PORT
const port = 3000;
//BODY PARSER MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));
//VIEW SETUP
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//CONNECT TO MONGODB
MongoClient.connect(url, (err, database) => {
  console.log("MongoDB Connected");
  if(err) throw err;

  db = database;

  Todos = db.collection("todos");

  app.listen(port, () => {
    console.log("Server Running on port... "+port);
  });
});

app.get("/", (req, res, next) => {
  Todos.find({}).toArray((err, todos) => {
    if(err){
      console.log(error);
    }
      res.render("index", {todos: todos});
  });
});

app.post("/todo/add", (req, res, next) => {
  //CREATE A todo
  const todo = {
    text: req.body.text,
    body: req.body.body
  }

  //INSERT todo
  Todos.insert(todo, (err, result) => {
      if(err){
        console.log(err)
      }
      console.log("Todo Added...");
      res.redirect("/");
  });
});

app.delete("/todo/delete/:id", (req, res, next) => {
  const query = {_id: ObjectID(req.params.id)};
  Todos.deleteOne(query, (err, response) => {
    if(err){
      console.log(err)
    }
    console.log("Todo Removed");
    res.sendStatus(200)
  })
});
