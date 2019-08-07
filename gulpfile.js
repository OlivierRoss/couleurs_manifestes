// https://css-tricks.com/why-npm-scripts/#article-header-id-11
const { parallel  } = require('gulp');
const { exec  } = require('child_process');

function sass () {
  exec("npm run sass", (err, stdout, stderr) => {
    if (err) {
      console.error(err)
    } else {
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    }
  });
}

function babel () {
    exec("npm run babel", (err, stdout, stderr) => {
    if (err) {
      console.error(err)
    } else {
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    }
  });
}

exports.transpile = parallel(sass, babel);
