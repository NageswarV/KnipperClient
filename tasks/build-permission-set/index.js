var gulp = require('gulp');
var gulpFile = require('gulp-file');
var fse = require('fs-extra');
var path = require('upath');
var pump = require('pump');
var request = require('request');
var handlebars = require('handlebars');

module.exports = function (cb) {
  var permissionTemplateSource = fse.readFileSync(__dirname + '/./permission-set.template.hbs', { encoding: 'utf-8' });

  var permissionTemplate = handlebars.compile(permissionTemplateSource);

  request({
    method: 'POST',
    url: "http://localhost:56036//api/services/app/role/GetAllPermissionsByProgramType?programType=5010BEA1-A8D3-49DE-86F8-530C1FDD5B42",
    json: true,
    headers: {
      'Accept': 'application/json'
    }
  }, function (error, res, body) {
    if (error) {
      console.log(error);

      cb();

      return;
    }

    var data = {
      permissionSet: body.result
    };

    var cvTsExport = permissionTemplate(data);

    var pumpSequence = [
      gulpFile('./permission-set.ts', cvTsExport, { src: true }),
      gulp.dest('./src/generated'),
    ];

    pump(pumpSequence, cb);
  });
};
