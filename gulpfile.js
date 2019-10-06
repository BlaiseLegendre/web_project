var gulp        = require('gulp');
const gulp = require("gulp");
const browsersync = require("browser-sync");
const phpConnect = require('gulp-connect-php');
const sass = require("gulp-sass");

function connectsync() {
    phpConnect.server({
        port: 8000,
        keepalive: true,
        base: "./"
    }, function (){
        browsersync({
            proxy: '127.0.0.1:8000'
        });
    });
}

function browserSyncReload(done) {
    browsersync.reload();
    done();
}

function watchFiles() {
    gulp.watch("./**/*.php", browserSyncReload);
    gulp.watch("./**/*.html", browserSyncReload);
    gulp.watch("./scss/**", css);
}

function css() {
    return gulp
    .src("./scss/**/*.scss")
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest("./css/"))
    .pipe(browsersync.stream());
 }

const watch = gulp.parallel([watchFiles, connectsync]);

exports.default = watch;