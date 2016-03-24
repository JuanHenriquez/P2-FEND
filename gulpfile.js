'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    gulpSass = require('gulp-sass'),
    rename = require('gulp-rename'),
    imageOptim = require('gulp-imageoptim');

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

/* Add vendor files to dist */
gulp.task('update-files', function(){
    
    /* Add Roboto font and Material Icons */
    gulp.src('bower_components/Materialize/font/**')
        .pipe(gulp.dest('./dist/font/'));
    
    /* Add materialize.css */
    gulp.src('bower_components/Materialize/sass/materialize.scss')
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(cleanCSS({debug: true}, function(details){
            console.log("The file " + details.name + "(" +  details.stats.originalSize + "kb)" + " has been compresed to " + details.stats.minifiedSize + "kb");
        }))
        .pipe(rename('materialize.min.css'))
        .pipe(gulp.dest('./dist/css'));
    
    /* Add materialize.js */
    gulp.src('bower_components/Materialize/dist/js/materialize.min.js')
        .pipe(gulp.dest('./dist/js'));
    
    /* Add jquery */
    gulp.src('bower_components/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('./dist/js'));
});

/* Optimize all pictures */
gulp.task('optimize-pictures', function(){
    return gulp.src('dist/images/*.jpg')
        .pipe(imageOptim.optimize())
        .pipe(gulp.dest('dist/images/production/'));
});


gulp.task('watch', function(){
    gulp.watch('src/css/*.scss', ['compileSass', 'minifyCss']);
    gulp.watch('dist/js/app.js', ['minifyJs']);
});