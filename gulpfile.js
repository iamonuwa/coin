(function () {
	'use strict'

	var gulp = require('gulp');
	var browserSync = require('browser-sync').create();
	var sass = require('gulp-sass');
	var concat = require('gulp-concat');
	var filter = require('gulp-filter');
	var mainBowerFiles = require('main-bower-files');
	var uglify = require('gulp-uglify');
	var rename = require('gulp-rename');
	var runSequence = require('run-sequence');
	var replace = require('gulp-replace');
	var jasmineBrowser = require('gulp-jasmine-browser');

	gulp.task('serve', ['sass'], function() {

	    browserSync.init({
	        server: "src/"
	    });

	    gulp.watch('src/assets/sass/components/*.scss', ['sass']);
	    gulp.watch('src/assets/sass/components/*.scss').on('change', browserSync.reload);;
	    gulp.watch('src/index.html').on('change', browserSync.reload);
	    gulp.watch('src/config/app.module.js').on('change', browserSync.reload);

	});


	gulp.task('sass', function () {
	    return gulp.src('src/assets/sass/*.scss')
	        .pipe(sass())
	        .pipe(gulp.dest('src/assets/styles'))
	        .pipe(browserSync.stream());
	});

	gulp.task('watch', function () {
	    gulp.watch('src/assets/sass/**/*.scss');
	});

	gulp.task('jasmine', function() {
	  return gulp.src(['src/scripts/*.js', 'spec/**/*_spec.js'])
	    .pipe(jasmineBrowser.specRunner())
	    .pipe(jasmineBrowser.server({port: 8888}));
	});
	gulp.task('default', ['watch', 'serve'])


})();