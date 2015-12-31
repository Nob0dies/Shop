var gulp = require("gulp"),
    jade = require('gulp-jade'),
    spritesmith = require('gulp.spritesmith'),
    sass = require('gulp-sass');
var browserSync = require("browser-sync");
var clear       = require('gulp-clean');

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
    browserSync({
        port: 9000,
        server: {
            baseDir: './app'
        }
    });
});

//компилируем jade в html
gulp.task('jade', function () {
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
    gulp.src('./sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css'));
});

// Собираем спрайты
gulp.task('sprite_social', function () {
    // Собирает картинки в папке ./img и возвращает .png спрайт and CSS классы
    var spriteData = gulp.src('./img/social/*.png').pipe(spritesmith({
        imgName: 'sprite-social-icons.png',
        cssFormat: 'scss',
        cssName: '_sprite-social-icons.scss',
        imgPath: '../img/sprite-social-icons.png',
        algorithm: 'binary-tree',
        padding: 4,
        cssVarMap: function (sprite) {
            sprite.name = 'sprite__social-' + sprite.name
        }
    }));

    spriteData.img.pipe(gulp.dest('./app/img/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('./sass/')); // путь, куда сохраняем стили
    //return spriteData.pipe(gulp.dest('app/img/'));
});

// Собираем спрайты
gulp.task('sprite_all', function () {
    // Собирает картинки в папке ./img и возвращает .png спрайт and CSS классы
    var spriteData = gulp.src('./img/*.png').pipe(spritesmith({
        imgName: 'sprite-all.png',
        cssFormat: 'scss',
        cssName: '_sprite-all.scss',
        imgPath: '../img/sprite-all.png',
        algorithm: 'binary-tree',
        padding: 4,
        cssVarMap: function (sprite) {
            sprite.name = 'sprite__all-' + sprite.name
        }
    }));

    spriteData.img.pipe(gulp.dest('./app/img/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('./sass/')); // путь, куда сохраняем стили
    //return spriteData.pipe(gulp.dest('app/img/'));
});

// clear dist
gulp.task('clean', function () {
    return gulp.src('./app/**/*.*', { read: false })
        .pipe(clear({force:true}));
});


gulp.task('build', ['clean',
    'sprite_all',
    'sprite_social',
    'jade',
    'sass'
]);

//наблюдаем за изменениями в файлах папки app
gulp.task('watch', function () {

    gulp.watch('./sass/**', ['sass']);
    gulp.watch('./jade/**', ['jade']);
    gulp.watch('./img/social/*.*', ['sprite_social']);

    gulp.watch(['./app/**'], function (file) {
        browserSync.reload();
    });
});

//задание по умолчанию ("gulp") запускает сервер и слушатель изменений
gulp.task('default', ['server', 'watch']);
