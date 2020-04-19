const { src, dest, series } = require('gulp');
const project = require('./angular.json').defaultProject;

const libPath = `projects/${project}/src/lib`;
const distPath = `dist/${project}`;

function copyFiles() {
  return src(['README.md', 'LICENSE']).pipe(
    dest(distPath)
  );
}

function copyStyles() {
  return src(`${libPath}/**/*.scss`).pipe(
    dest(`${distPath}/lib`)
  );
}

module.exports = {
  default: series(copyFiles, copyStyles, (done) => {
    done();
    console.log(`Successfully copied assets for "${project}"!`);
  })
};
