const { spawn } =require('child_process');

async function runProcess(command, args) {
  const p = spawn(command, args)
  let output = '';
  p.stdout.on("data", data => {
    output += data.toString()
  });


  return new Promise((resolve, reject) => {
    p.on('exit', (code) => {
      resolve({ output, code })
    })
  });
}

module.exports = {
  runProcess
}
