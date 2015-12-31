var gulp = require("gulp"),
   // browserSync = require('browser­sync'),
    jade = require('gulp-jade'),
    spritesmith  = require('gulp.spritesmith'),
    sass = require('gulp-sass');

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'app/',
        js: 'app/js/',
        css: 'app/css/',
        img: 'app/img/',
        imgDev: './img/**/*.*',
        fonts: 'app/fonts/'
    },
    app: { //Пути откуда брать исходники
        html: 'app/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'app/js/**/main.js',//В стилях и скриптах нам понадобятся только main файлы
        style: './sass/**/*.scss',
        img: 'app/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        imgDev: './img/**/*.*',
        fonts: 'app/fonts/**/*.*'
    },
    dev: { //Пути откуда брать исходники
        style: './sass/**/*.scss',
        imgDev: './img/**/*.*',
        jade: './jade/**/*.jade'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'app/*.html',
        js: 'app/js/**/*.js',
        style: 'app/styles/**/*.css',
        sass: './sass/**/*.scss',
        img: 'app/img/**/*.*',
        imgDev: './img/**/*.*',
        fonts: 'app/fonts/**/*.*'
    },
    clean: './app'
};
//var reload      = browserSync.reload;
var config = {
    server: {
        baseDir: "./app"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "shop_dev"
};

//запускаем сервер
gulp.task('server', function () {
/*    browserSync({
        port: 9000,
        server: {
            baseDir: './app'
        }
    });*/
    gulp.watch(path.dev.sass, ['sass']);
    gulp.watch(path.dev.jade, ['jade-watch']);
});


//наблюдаем за изменениями в файлах папки app
/*
gulp.task('watch', function () {
    gulp.watch([
        'app/!*.html',
        'app/js/!**!/!*.js',
        'app/styles/!**!/!*.css',
        'app/img/!**!/!*.*'
    ]).on('change', browserSync.reload)
});
*/

//компилируем jade в html
gulp.task('jade', function() {
    gulp.src('./jade/index.jade')
        .pipe(jade({
            pretty: '\t' // отступы в 1 таб
        }))
        .pipe(gulp.dest('./app/'))
});

//слушает изменения в jade шаблонах
gulp.task('jade-watch', ['jade']);

//компиляция scss в css
gulp.task('sass', function () {
    gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css'));
});

// Собираем спрайты
gulp.task('sprite_social', function () {
    // Собирает картинки в папке ./img и возвращает .png спрайт and CSS классы
    var spriteData = gulp.src('./img/social/*.png').pipe(spritesmith({
        imgName: 'sprite-social-icons.png',
        cssFormat: 'scss',
        cssName: 'sprite-social-icons.scss',
        imgPath: '../img/sprite-social-icons.png',
        algorithm: 'binary-tree',
        padding: 4,
        cssVarMap: function(sprite) {
            sprite.name = 'social-' + sprite.name
        }
    }));

    spriteData.img.pipe(gulp.dest('./app/img/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('./sass/')); // путь, куда сохраняем стили
    //return spriteData.pipe(gulp.dest('app/img/'));
});


// Watch
gulp.task('watch', function(){
    gulp.watch('./jade/index.jade',['jade']);
    gulp.watch('./sass/main.scss',['sass']);
    gulp.watch('./img/social/*.*',['sprite_social']);
});
//задание по умолчанию ("gulp") запускает сервер и слушатель изменений
gulp.task('default', ['sprite_social', 'server', 'watch', 'sass:watch', 'jade-watch']);
