const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { readdirSync } = require("fs");
const http = require("http");
const SocketIO = require("socket.io");

// const path = require("path");

//import routes

const app = express();

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log("DB CANNOT CONNECT ERR", err);
  });

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(cors());

readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }



const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
