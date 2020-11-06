var gulp = require('gulp');
var gulpFile = require('gulp-file');
var fse = require('fs-extra');
var path = require('upath');
var pump = require('pump');
var request = require('request');
var handlebars = require('handlebars');
var environment = require('../../src/environment.js');

module.exports = function (cb) {
  var cvTemplateSource = fse.readFileSync(__dirname + '/./classification-values.template.hbs', { encoding: 'utf-8' });

  var cvTemplate = handlebars.compile(cvTemplateSource);

  request({
    method: 'POST',
    url: environment.webApiUrl + "/api/services/app/classification/GetFilteredClassificationValues",
    json: true,
    headers: {
      'Accept': 'application/json',
      'Abp.TenantId': 1
    }
  }, function (error, res, body) {
    if (error) {
      console.log(error);

      cb();

      return;
    }

    var cvData = {
      classificationValues: body.result
    };

    var cvTsExport = cvTemplate(cvData);

    var pumpSequence = [
      gulpFile('./classification-values.ts', cvTsExport, { src: true }),
      gulp.dest('./src/generated')
    ];

    pump(pumpSequence, cb);
  });
};
