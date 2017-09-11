var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var utilities = require('gulp-util');
var del = require('del');
var jshint = require('gulp-jshint');
var buildProduction = utilities.env.production;

// Bower manages all front end dependencies like jquery
// Bootstrap, and for this app, Moment.js
// The corresponding Gulp task will pull from Node package
// Manager all the Bower Dependencies depending on their
// File extension(js/css/html), concat them into one vendor
// File, Minify it, and toss it to its final destination
// In the buil directory. That is why we only need to Link
// One file in our html page. (vendor.min.js)/(vendor.min.css)

// We don't have to do this, and could link jquery, boostrap, moment,
// And whatever else we're doing, but it's cleaner to have a task manager
// Do it for us. This is what is happening when we run npm install and it pulls
// All of our dependencies listed in the package.json object
// It's just doing it for the front end specifically

var lib = require('bower-files')({ //special case for bootstrap,
  "overrides":{                    //have to tell bower-files package
    "bootstrap" : {                //exactly where to find the bootstrap
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});
var browserSync = require('browser-sync').create();
var babelify = require("babelify");

//pull in JS files and concat into one file,
//minify, and throw into build directory
gulp.task('bowerJS', function () {
  return gulp.src(lib.ext('js').files) //returns all files that
    .pipe(concat('vendor.min.js'))     //are mentioned in bower.json
    .pipe(uglify())                    //file (moment, bootstrap, jquery)
    .pipe(gulp.dest('./build/js'));
});

//pull in CSS files and concat into one file
//throw into build/css directory
gulp.task('bowerCSS', function () {
  return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./build/css'));
});

//two above commands happen at once
gulp.task('bower', ['bowerJS', 'bowerCSS']);

//build depends on which production environment
//either way, bower cascading occurs
gulp.task('build', ['clean'], function(){
  if (buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
  gulp.start('bower');
});

//create a browser server
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });
  //any JS, HTML, or CSS files will auto run
  //in the browser if gulp serve has been initiated
  gulp.watch(['js/*.js','css/*.css', 'index.html'], ['jsBuild']);
  gulp.watch(['bower.json'], ['bowerBuild']);
});

gulp.task('jsBuild', ['jsBrowserify', 'jshint'], function(){
  browserSync.reload();
});

gulp.task('bowerBuild', ['bower'], function(){
  browserSync.reload();
});

gulp.task('concatInterface', function() {
  return gulp.src(['./js/*.js'])
  .pipe(concat('allConcat.js'))
  .pipe(gulp.dest('./tmp'));
});
//translate ES6 into es2015
gulp.task('jsBrowserify', ['concatInterface'], function() {
  return browserify({ entries: ['./tmp/allConcat.js'] })
    .transform(babelify.configure({
      presets: ["es2015"]
    }))
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});
gulp.task("minifyScripts", ["jsBrowserify"], function(){
  return gulp.src("./build/js/app.js")
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"));
});
gulp.task('jshint', function(){
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
gulp.task("clean", function(){
  return del(['build', 'tmp']);
});
