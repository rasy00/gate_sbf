import express from "express";
import path from "path";
import ip from "ip";
import db_operation from "./db_operation.js";

import { fileURLToPath } from "url";

const app = express();
const port = 5000;

// tes db_operation

// app starting
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// for serving static files
app.use(express.static(__dirname + "/public/"));
app.use(express.static(__dirname));
// for parsing application/json
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "view/index.html"));
});

// db_operation.checking(21221023, (result) => {
//   if (result[0]) console.log(result);
//   else console.log("Data not found");
// });

app.post("/checking", (req, res) => {
  // res.json({ no: res.body.no_induk });
  db_operation.checking(req.body.no_induk, (result) => {
    console.log(result[0]);
    if (result[0]) {
      res.json(result[0]);
    } else {
      console.log("data not found");
      res.json({ error: true });
    }
  });
});

app.listen(port, () => {
  console.log(`App listening ${ip.address()} on port ${port}`);
});
