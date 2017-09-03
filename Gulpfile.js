const gulp = require('gulp'),
	sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    minify = require('gulp-minifier');
 


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


gulp.task('prefix', function(){

    gulp.src('css/**/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('mini', function() {
  return gulp.src('**/*').pipe(minify({
    minify: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    minifyJS: true,
    minifyCSS: true,
    getKeptComment: function (content, filePath) {
        var m = content.match(/\/\*![\s\S]*?\*\//img);
        return m && m.join('\n') + '\n' || '';
    }
  })).pipe(gulp.dest('example/dest'));
});
 


//Watch task
gulp.task('watch', ['browserSync', 'styles', 'prefix'], function() {
    gulp.watch('sass/**/*.sass', ['prefix']);
    gulp.watch('sass/**/*.sass',['styles']);
	gulp.watch('sass/**/*.sass', browserSync.reload);
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('*.js', browserSync.reload);
});

 
