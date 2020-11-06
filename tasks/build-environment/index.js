var gulp = require('gulp');
var gulpFile = require('gulp-file');
var gulpUmd = require('gulp-umd');
var handlebars = require('handlebars');
var fse = require('fs-extra');
var path = require('upath');
var pump = require('pump');

module.exports = function (cb) {
  var srcFolder = require('../../angular.json').projects.repportalweb.sourceRoot;
  var environmentDefaults = require('../../src/environment-defaults.json');
  var environmentTemplateSource = fse.readFileSync(__dirname + '/./environment.template.hbs', { encoding: 'utf-8' });

  for (var name in environmentDefaults) {
    process.env[name] = process.env[name] ? process.env[name] : environmentDefaults[name];
  }

  var environmentTemplate = handlebars.compile(environmentTemplateSource);

  var environmentJsExport = environmentTemplate(process.env);

  var pumpSequence = [
    gulpFile('./environment.js', environmentJsExport, { src: true }),
    gulpUmd(),
    gulp.dest(srcFolder),
  ];

  pump(pumpSequence, cb);
};
