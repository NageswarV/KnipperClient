'use strict';

var gulp = require('gulp');

gulp.task('build-classification-values', require('./tasks/build-classification-values'));

gulp.task('build-permission-set', require('./tasks/build-permission-set'));

gulp.task('build-environment', require('./tasks/build-environment'));

gulp.task('build-build-result', require('./tasks/build-build-result'));