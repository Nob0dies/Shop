var gulp = require("gulp"),
    browserSync = require('browser­sync');
gulp.task('server', function () {
    browserSync({
        port: 9000,
        server: {
            baseDir: 'app'
        }
    })
});
gulp.task('watch', function () {
    gulp.watch([
        '*.html',
        'js/**/*.js',
        'css/**/*.css'
    ]).on('change', browserSync.reload)
});
gulp.task('default', ['server', 'watch']);
var jade = require('gulp-jade');
gulp.task('jade', function() {
    var YOUR_LOCALS = {}; // можно подключить JSON с данными
    gulp.src('./jadePath/*.jade')
        .pipe(jade({
            locals: YOUR_LOCALS,
            pretty: '\t' // отступы в 1 таб
        }))
        .pipe(gulp.dest('./htmlPath/'))
});

