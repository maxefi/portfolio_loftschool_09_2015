// ██╗   ██╗ █████╗ ██████╗ ███████╗
// ██║   ██║██╔══██╗██╔══██╗██╔════╝
// ██║   ██║███████║██████╔╝███████╗
// ╚██╗ ██╔╝██╔══██║██╔══██╗╚════██║
//  ╚████╔╝ ██║  ██║██║  ██║███████║
//   ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝

var gulp = require("gulp"),
		browserSync = require('browser-sync'),
		del = require("del"),
        gutil = require("gulp-util"),
		concatCSS = require('gulp-concat-css'),
		minifyCSS = require('gulp-minify-css'),
		uglify = require('gulp-uglify'),
		gulpif = require("gulp-if"),
		autoprefixer = require("gulp-autoprefixer"),
		wiredep = require("wiredep").stream,
		size = require("gulp-size"),
		notify = require('gulp-notify');



//  █████╗ ██████╗ ██████╗
// ██╔══██╗██╔══██╗██╔══██╗
// ███████║██████╔╝██████╔╝
// ██╔══██║██╔═══╝ ██╔═══╝
// ██║  ██║██║     ██║
// ╚═╝  ╚═╝╚═╝     ╚═╝

/*BROWSERSYNC task - server, watch*/
gulp.task('server', function () {
	browserSync.init({
		port: 9000,
		server: {
			baseDir: "./app"
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

// CONNECTING BOWER TASK - wiredep-bower
gulp.task("wiredep-bower", function () {
    return gulp.src("./app/*.html")
        .pipe(wiredep({
            directory: "./app/bower",
            /*, overrides: {
                "qtip2": {
                    "main": ["./jquery.qtip.min.js", "./jquery.qtip.min.css"],
                    "dependencies": {"jquery": ">=1.6.0"}
                }
            }*/
            //, exclude: ["bower/qtip2/"]
            // , ignorePath: /^(\.\.\/)*\.\./
        }))
        .pipe(gulp.dest("./app"));
});

gulp.task("watch-bower", function () {
    return gulp.watch("watch-bower", ["wiredep-bower"]);
});

// DEFAULT TASK
gulp.task("default", ["watch", "server", "wiredep-bower", "watch-bower"]);

var log = function (error) {
    console.log([
        "",
        "----------ERROR MESSAGE START----------",
        ("[" + error.name + " in " + error.plugin + "]"),
        error.message,
        "----------ERROR MESSAGE END----------",
        ""
    ].join("\n"));
    this.end();
}



// ██████╗ ██╗███████╗████████╗
// ██╔══██╗██║██╔════╝╚══██╔══╝
// ██║  ██║██║███████╗   ██║
// ██║  ██║██║╚════██║   ██║
// ██████╔╝██║███████║   ██║
// ╚═════╝ ╚═╝╚══════╝   ╚═╝

// TRANSFER
// HTML TASK - t-html
gulp.task("t-html", function () {
    return gulp.src("./app/*.html")
        .pipe(gulp.dest("dist"))
        .pipe(notify({
    	'title': 'HTML',
    	'message': "TRANSFERED TO DIST"
	}));
});

// PHP TASK - t-php
gulp.task("t-php", function () {
    return gulp.src("./app/*.php")
        .pipe(gulp.dest("dist"))
        .pipe(notify({
        'title': 'PHP',
        'message': "TRANSFERED TO DIST"
    }));
});

// CSS TASK - t-css
gulp.task("t-css", function () {
    return gulp.src("./app/css/*.css")
    	// .pipe(concatCSS("main.min.css"))
        .pipe(gulpif("*.css", minifyCSS({compatibility: "ie8"})))
        .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
        .pipe(gulp.dest("dist/css"))
        .pipe(notify({
    	'title': 'CSS',
    	'message': "TRANSFERED TO DIST"
	}));
});

// JS TASK - t-js
gulp.task("t-js", function () {
    return gulp.src("./app/js/*.js")
        // .pipe(gulpif("*.js", uglify()))
        .pipe(gulp.dest("dist/js"))
        .pipe(notify({
    	'title': 'JS',
    	'message': "TRANSFERED TO DIST"
	}));
});

//BOWER TASK - t-bower
gulp.task("t-bower", function() {
	return gulp.src("./app/bower/**/*.+(js|css)")
		.pipe(gulp.dest("./dist/bower/"))
});

//FONTS TASK - t-fonts
gulp.task("t-fonts", function() {
    return gulp.src("./app/fonts/**")
    	.pipe(gulpif("*.css", minifyCSS({compatibility: "ie8"})))
        .pipe(gulp.dest("./dist/fonts/"))
});

//IMG TASK - t-img
gulp.task("t-img", function() {
    return gulp.src("./app/img/**")
        .pipe(gulp.dest("./dist/img/"))
});

//FAVICON TASK - t-favi
gulp.task("t-favi", function () {
	return gulp.src("./app/favicon/*")
		.pipe(gulp.dest("./dist/favicon"))
});

// CLEAN DIST TASK - clean-dist
gulp.task("clean-dist", function () {
    return del(["./dist/**", "!./dist"])
});

//DIST SERVER TASK - server-dist
gulp.task("server-dist", function () {
    browserSync.init({
        port: 7000,
        server: { baseDir: "./dist" }
    });
});



// ██████╗ ██╗   ██╗██╗██╗     ██████╗ ███████╗
// ██╔══██╗██║   ██║██║██║     ██╔══██╗██╔════╝
// ██████╔╝██║   ██║██║██║     ██║  ██║███████╗
// ██╔══██╗██║   ██║██║██║     ██║  ██║╚════██║
// ██████╔╝╚██████╔╝██║███████╗██████╔╝███████║
// ╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝ ╚══════╝

//APP SIZE TASK - size-app
gulp.task("size-app", function () {
    return gulp.src("app/**/*").pipe(size({title: "APP size: "}));
});

//DIST BUILD TASK - dist
gulp.task("dist", ["t-html", "t-php", "t-css", "t-js", "t-bower", "t-fonts", "t-img", "t-favi", "size-app"], function () {
    return gulp.src("dist/**/*").pipe(size({title: "DIST size: "}));
});

//DIST ON READY BUILD TASK - build
gulp.task("build", ["clean-dist"], function () { //, "wiredep-bower"
    gulp.start("dist");
});
