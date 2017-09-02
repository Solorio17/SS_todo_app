const express = require("express"),
      path    = require("path"),
      bodyParser = require("body-parser");

//INIT APP
const app = express();
//PORT
const port = 3000;
//BODY PARSER MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));
//VIEW SETUP
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log("Server Running on port... "+port);
});
