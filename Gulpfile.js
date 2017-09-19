const 	gulp 			= require('gulp'),
		sass 			= require('gulp-sass'),
		browserSync 	= require('browser-sync'),
		autoprefixer 	= require('gulp-autoprefixer');

// Server - Browser Sync

gulp.task('browserSync', function () {
	browserSync.init({
		server: {
			baseDir: "src/"
		}
	});
});

// SASS compiler

gulp.task('styles', function() {
    gulp.src('./src/sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css/'))
});


// CSS prefixing - handle manually

gulp.task('prefix', function () {
	gulp.src('src/css/*.css')
		.pipe(autoprefixer({
			browsers: ['last 4 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('src/css/pref/'))
});


// Gulp watch - watching for changes in files

gulp.task('watch', ['browserSync', 'styles'], function () {
	gulp.watch('src/sass/**/*.sass', ['styles']);
	gulp.watch('src/**/*.*', browserSync.reload);
})