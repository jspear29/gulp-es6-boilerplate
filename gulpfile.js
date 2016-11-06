'use strict';

const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const gutil = require('gulp-util');
const connect = require('gulp-connect');

gulp.task('scripts', function() {
  browserify({entries: ['src/js/index.js'], debug: true})
    .transform('babelify', {presets: ['es2015'], sourceMaps: true})
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(connect.reload());
});

// move html/templates/whatever
gulp.task('assets', function() {
  gulp.src('src/**/*.html')
    .pipe(gulp.dest('build/'))
    .pipe(connect.reload());
});

// compile the sass
gulp.task('sass', function() {

});

// move the vendor stuff here
gulp.task('vendor', function() {
  gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest('build/vendor/css'))
});

// watch my stuffs
gulp.task('watch', function() {
  gulp.watch(['src/**/*.html'], ['assets']);
  gulp.watch(['src/**/*.js', 'src/**/*.jsx'], ['scripts']);
});

// dev server
gulp.task('serve', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});

gulp.task('default', ['scripts', 'assets', 'vendor', 'sass', 'serve', 'watch']);
