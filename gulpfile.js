var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var cache = require("gulp-cache");

gulp.task("clear", function(){
        cache.clearAll();
})
gulp.task("serve", function(){
        browserSync.init({
        // if using wamp, no need to define server,
        // the proxy is the "site" you're serving via wamp.
        // this is just for automatic page reload
                server: "./src",
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

gulp.task("default", gulp.series("serve", "clear"));