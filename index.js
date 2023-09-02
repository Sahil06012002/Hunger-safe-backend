const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const knex = require("knex");
const insertItem = require("./controllers/Insertitem.js");
const getitems = require("./controllers/getitems.js");
const signup = require("./controllers/Signup.js");
const signin = require("./controllers/Signin.js");
const { error } = require("console");

const db = knex({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "hungerSafe",
  },
});

const app = express();

app.use(express.json());
app.use(cors());

const secret = "supers3cr3t";

const authentication = (req, res, next) => {
  console.log("authorization working");
  console.log(req.headers);
  const authToken = req.headers.authorisation;
  console.log(authToken + "   this is the token");
  if (authToken) {
    const token = authToken.split(" ")[1];
    jwt.verify(token, secret, (err, id) => {
      if (err) {
        res.sendStatus(403);
      } else next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.get("/", (req, res) => {
  res.send("hello world123");
});

app.post("/signup", (req, res) => {
  signup.handleSignup(req, res, db);
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db);
});

app.post("/insertItem", authentication, (req, res) => {
  insertItem.handleInsertItems(req, res, db);
});

app.get("/getItem", (req, res) => {
  getitems.handlegetItems(req, res, db);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
