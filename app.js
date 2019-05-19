const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const tasks = require("./routes/tasks");

const app = express();
const port = 3000;

//middleware of express
app.use(bodyParser.json());
app.use(cors());
app.use("/tasks", tasks);
app.use(express.static("./public"));

//Mongo DB configuration
const db = "mongodb://localhost:27017/tasks";
mongoose.connect(db, { useNewUrlParser: true });

mongoose.connection.on("connected", () => {
  console.log("connected to MongoDB");
});
mongoose.connection.on("error", () => {
  console.log("Cannot connect to MongoDB");
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
