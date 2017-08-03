const gulp = require('gulp'),
	sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer');
// Static server
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('styles', function() {
    gulp.src('sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'))
});

//Watch task
gulp.task('watch', ['browserSync', 'styles'], function() {
    gulp.watch('sass/**/*.sass',['styles']);
	gulp.watch('sass/**/*.sass', browserSync.reload);
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('*.js', browserSync.reload);
});

 
gulp.task('default', () =>
    gulp.src('css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'))
);