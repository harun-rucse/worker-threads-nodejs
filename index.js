const express = require("express");
const app = express();

app.get("/non-blocking", (req, res) => {
  res.status(200).send("This is non-blocking route");
});

app.get("/blocking", (req, res) => {
  let count = 0;
  for (let i = 0; i < 10000000000; i++) {
    count++;
  }

  res.status(200).send(`Result is: ${count}`);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
