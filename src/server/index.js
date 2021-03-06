const express = require("express");
const app = express();
const port = 8080;
const requests = require('./requests.js');

app.use(express.static("./public"));
app.get("/stats", requests.peopleStats);
app.listen(port);

console.log(`Running at http://localhost:${port}`);
