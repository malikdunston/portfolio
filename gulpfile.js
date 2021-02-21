var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var cache = require("gulp-cache");
var sass = require("gulp-sass");

// cache
gulp.task("clear", function(){
        cache.clearAll();
});

// sass
var sass_origin = "./src/assets/scss/**/*.scss";
var sass_dest = "./src/*.css";
gulp.task("copmpile_sass", function(){
	gulp.src(sass_origin)
		.pipe(sass().on("error", sass.logError))
		.pipe(changed(sass_dest))
		.pipe(gulp.dest(sass_dest));
});
gulp.task("watch_sass", function(){
	gulp.watch(sass_dest, ["compile_sass"]);
});

// browser-sync
gulp.task("serve", function(){
        browserSync.init({
        // if using wamp, no need to define server,
        // the proxy is the "site" you're serving via wamp.
        // this is just for automatic page reload
                server: "./public",
                // port: "8081",
                // port: "3002",
                // proxy: "nowplaying"
        });
        let projFiles = [
                "./**",
                "./**/**/**/*.html",
                "./**/**/**/*.js",
                "./**/**/**/*.php",
                "./**/**/**/*.svg"
        ]
        gulp.watch(projFiles).on("change", browserSync.reload);
});

gulp.task("default", gulp.series("serve", "clear", "watch_sass"));