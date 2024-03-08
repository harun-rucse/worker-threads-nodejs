const { parentPort } = require("worker_threads");

let count = 0;
for (let i = 0; i < 10000000000; i++) {
  count++;
}

parentPort.postMessage(count);
