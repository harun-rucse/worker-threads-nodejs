const express = require("express");
const { Worker } = require("worker_threads");
const app = express();
const THREAD_COUNT = 10;

function createWorkerThread() {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker-optimized.js", {
      workerData: {
        thread_count: THREAD_COUNT,
      },
    });

    worker.on("message", (data) => {
      resolve(data);
    });

    worker.on("error", (error) => {
      reject(error);
    });
  });
}

app.get("/non-blocking", (req, res) => {
  res.status(200).send("This is non-blocking route");
});

app.get("/blocking", async (req, res) => {
  try {
    let workerPromises = [];

    for (let i = 0; i < THREAD_COUNT; i++) {
      workerPromises.push(createWorkerThread());
    }

    const results = await Promise.all(workerPromises);
    const data = results.reduce((acc, val) => {
      return acc + val;
    }, 0);

    res.status(200).send(`Result is: ${data}`);
  } catch (error) {
    res.status(500).send(`Error occur: ${error}`);
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
