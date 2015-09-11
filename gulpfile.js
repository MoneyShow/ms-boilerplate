'use strict';

var basePath = {

  dev: 'src/',
  public: 'public/assets/'

};

var paths = {
  img: {
    dev: basePath.dev + 'img/',
    public: basePath.public + 'img/'
  },
  scripts: {
    dev: basePath.dev + 'js/',
    public: basePath.public + 'js'
  },
  styles: {
    dev: basePath.dev + 'scss/',
    public: basePath.public + 'css'
  }
};

var siteFiles = {
  styles: paths.styles.dev + '**/*.scss',
  scripts: [paths.scripts.dev + 'main.js']
};


//required
var gulp = require('gulp');
var rename  = require('gulp-rename');
var uglify  = require('gulp-uglify');
var sass = require("gulp-sass");
var minifyCss = require('gulp-minify-css');


gulp.task('compile:js', function() {
  return gulp.src(siteFiles.scripts)

  //Add this back in if you wanted a readable version of the .js file
  //.pipe(gulp.dest(paths.scripts.public)) 

  .pipe(uglify())
  .pipe(rename({ extname: '.min.js'}))
  .pipe(gulp.dest(paths.scripts.public));
});

gulp.task('compile:css', function() {
  return gulp.src(siteFiles.styles)
    .pipe(sass())
    .pipe(minifyCss())
    .pipe(rename({ extname: '.min.css'}))
    .pipe(gulp.dest(paths.styles.public));
});


gulp.task("watch", ["compile:js", "compile:css"],  function () {

  gulp.watch(siteFiles.scripts, ["compile:js"]);
  gulp.watch(siteFiles.styles, ["compile:css"]);

});