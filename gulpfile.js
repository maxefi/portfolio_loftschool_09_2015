var gulp = require("gulp"),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	notify = require('gulp-notify'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync');



/*CSS task - css, watchcss*/
gulp.task('css', function () {
  gulp.src('app/css/*.css')
    .pipe(minifyCSS({compatibility: 'ie8'}))
    .pipe(rename('main.min.css'))
    .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
    .pipe(gulp.dest('app/css/'))
    .pipe(notify({
    	'title': 'CSS',
    	'message': "optimized"
	}));
});

gulp.task('watchcss', function () {
	gulp.watch('app/css/main.css', ['css']);
})



/*BROWSERSYNC task - server, watch*/
gulp.task('server', function () {
	browserSync({
		port: 9000,
		server: {
			baseDir: 'app'
		}
	});
});

gulp.task('watch', function () {
	gulp.watch([
		'app/*.html',
		'app/js/**/*.js',
		'app/css/**/*.css'
	]).on('change', browserSync.reload);
});

gulp.task('defbrowser', ['server', 'watch', 'watchcss']);