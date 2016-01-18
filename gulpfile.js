var gulp = require("gulp"),
	browserSync = require('browser-sync'),
	jade = require('gulp-jade'),
	sass = require('gulp-sass'),
	spritesmith = require('gulp.spritesmith');



//компилятор _jade файлов
gulp.task('jade', function() {  
   gulp.src('app/_jade/*.jade')
    .pipe(jade({
        pretty: true
    }))
    .pipe(gulp.dest('./app/'));
});


//компилятор sass файлов
gulp.task('sass', function () {
  gulp.src('app/_scss/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('app/_css'));
});

//генератор спрайтов spritesmith
gulp.task('sprite', function () {
  var spriteData = gulp.src('./app/img/social_footer/*.png').pipe(spritesmith({  //откуда брать картинки
    imgName: 'social_footer.png',
    cssName: '_social_footer.scss',
    padding: 20
  }));
	spriteData.img.pipe(gulp.dest('./app/img/'));   // куда складывать готовые спрайты
	spriteData.css.pipe(gulp.dest('./app/_scss/_common/'));     // куда складывать стили спрайтов
});

//browserSync
gulp.task('server', function () {
	browserSync({
		port: 9000,
		server: {
			baseDir: 'app'
		}
	});
});

//прослушка событий
gulp.task('watch', function () {
	gulp.watch('app/_jade/**/*', ['jade']);
	gulp.watch('app/_scss/**/*', ['sass']);
	gulp.watch([
		'app/index.html',
		'app/*.html',
		'app/_js/**/*.js',
		'app/_css/**/*.css'
		]).on('change', browserSync.reload);
});


gulp.task('default', ['server', 'watch']);