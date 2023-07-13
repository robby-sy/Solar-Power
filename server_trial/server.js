const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const fs = require("fs");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/projects/:id", (req, res, next) => {
  DB = require("./db.json");
  const {id} = req.params
  const today = new Date()
  const project = DB.Project.find(el => el.id == id)
  
  res.status(201).json(data);
});

app.listen(port, () => {
  console.log("Listen from port ", port);
});
