var browserSync = require("browser-sync").create();
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var minifyCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var changed = require('gulp-changed');

var projFiles = [
	"./**",
	"./**/**/**/*.html",
	"./**/**/**/*.scss",
	"./**/**/**/*.js",
	"./**/**/**/*.svg"
]

var SCSS_WATCH = './src/assets/scss/**/*.scss';
var SCSS_SRC = './src/assets/scss/**/*.scss';
var SCSS_DEST = './public/assets/css';

function compile_scss() {
	return gulp.src(SCSS_SRC)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(minifyCSS())
		.pipe(rename({ suffix: '.min' }))
		.pipe(changed(SCSS_SRC))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(SCSS_DEST));
};
function watch_scss() {
	gulp.watch(SCSS_WATCH, compile_scss);
};

function serve(){
	// browserSync.init();
	gulp.watch(projFiles).on("change", browserSync.reload)
}

gulp.task('default', gulp.parallel(serve, watch_scss));

exports.serve = serve;
exports.compile_scss = compile_scss;
exports.watch_scss = watch_scss;