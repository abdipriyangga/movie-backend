require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const mainRouter = require("./src/routes/index");
const cors = require('cors');
app.get('/hello', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.status(200).send("<h1>Hello GFG Learner!</h1>");
});
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.listen(PORT, (error) => {
  if (!error)
    console.log("Server is Successfully Running, and App is listening on port " + PORT)
  else
    console.log("Error occurred, server can't start", error);
}
);

app.use("/", mainRouter);
module.exports = app;