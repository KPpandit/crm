const express = require("express");
const cors = require("cors");
const connection = require("./Config/config");
const app = express();
app.use(cors());
app.use(express.json());
app.post("/save", (req, res) => {
  console.log(req.body);
  
  res.send("success");
});
connection 
app.listen(9090, (err) => {
  console.log("app is run on port no 9090");
});
