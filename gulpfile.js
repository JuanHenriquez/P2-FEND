'use strict';

var gulp     = require('gulp'),
    concat   = require('gulp-concat'),
    uglify   = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    gulpSass = require('gulp-sass'),
    rename   = require('gulp-rename');

/*
* TASKS
*/


/* Compile Sass Files. */
gulp.task('compileSass', function(){
    return gulp.src('src/css/*.scss')
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(gulp.dest('./dist/css'));
});

/* Minify Css Files */
gulp.task('minifyCss', ['compileSass'] ,function(){
    return gulp.src('dist/css/style.css')
        .pipe(cleanCSS({debug: true}, function(details){
            console.log("The file " + details.name + "(" +  details.stats.originalSize + "kb)" + " has been compresed to " + details.stats.minifiedSize + "kb");
        }))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./dist/css'));
});

/* Minify Js Files  */
gulp.task('minifyJs', function(){
    return gulp.src('dist/js/app.js')
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('./dist/js'))
});


gulp.task('watch', function(){
    gulp.watch('src/css/*.scss', ['compileSass', 'minifyCss']);
    gulp.watch('dist/js/app.js', ['minifyJs']);
});