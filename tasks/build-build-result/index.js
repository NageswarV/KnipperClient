var gulp = require('gulp');
var gulpFile = require('gulp-file');
var fse = require('fs-extra');
var path = require('upath');
var pump = require('pump');

module.exports = function (cb) {
  var srcFolder = require('../../angular.json').projects.repportalweb.sourceRoot;
  var buildResultSourceLocation = './build.json';
  var buildResultSource = require(buildResultSourceLocation);

  var processEnv = process.env;
  var buildResultJson = {};

  for (var key in buildResultSource) {
    buildResultJson[key] = processEnv[key] !== undefined ? processEnv[key] : buildResultSource[key];
  }

  var pumpSequence = [
    gulpFile(path.basename(buildResultSourceLocation), JSON.stringify(buildResultJson, null, '\t'), { src: true }),
    gulp.dest(srcFolder, { cwd: path.resolve(__dirname, '../../') })
  ];

  pump(pumpSequence, cb);
};
