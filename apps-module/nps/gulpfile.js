'use strict';

var gulp = require('gulp');
var webserver = require('gulp-webserver');
var target = '';

gulp.task('js', function () {
	gulp.src(target + 'js/**/*');
});

gulp.task('html', function () {
	gulp.src(target + '*.html');
});

gulp.task('css', function () {
	gulp.src(target + 'css/*.css');
});

gulp.task('watch', function () {
	gulp.watch(target + 'js/**/*', gulp.series('js'));
	gulp.watch(target + 'css/*.css', gulp.series('css'));
	gulp.watch(target + '*.html', gulp.series('html'));
});

gulp.task('webserver', function () {
	gulp.src(target)
		.pipe(webserver({
			livereload: true,
			open: true
		}));
});

// gulp.task('default', ['watch', 'html', 'js', 'css', 'webserver']);

// gulp.task('a', ['b', 'c'], function () { // do something })

gulp.task('default', gulp.series(gulp.parallel('watch', 'html', 'js', 'css', 'webserver'), function () {
	// do something 
}));