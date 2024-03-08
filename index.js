const express = require("express");
const { Worker } = require("worker_threads");
const app = express();

app.get("/non-blocking", (req, res) => {
  res.status(200).send("This is non-blocking route");
});

app.get("/blocking", (req, res) => {
  const worker = new Worker("./worker.js");

  worker.on("message", (data) => {
    res.status(200).send(`Result is: ${data}`);
  });

  worker.on("error", (error) => {
    res.status(500).send(`Error occur: ${error}`);
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
