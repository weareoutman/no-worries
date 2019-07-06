const { spawn } = require("child_process");

module.exports = function promisedSpawn(...args) {
  return new Promise((resolve, reject) => {
    const task = spawn(...args);
    let output = Buffer.from([]);
    task.stdout.on("data", data => {
      output = Buffer.concat([output, data]);
    });
    task.stderr.on("data", data => {
      output = Buffer.concat([output, data]);
    });
    task.on("close", (code, signal) => {
      if (code === 0) {
        resolve({
          output
        });
      } else {
        reject({
          output,
          code,
          signal
        });
      }
    });
    task.on("error", error => {
      reject({
        output,
        error
      });
    });
    // task.on('exit', (code, signal) => {
    //   console.log(">>> exit", code, signal);
    // });
  });
};
