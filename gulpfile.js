var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');

gulp.task('default', function () {
    return gulp.src('less/*.less')
        .pipe(less())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: '.'
        },
    })
})

gulp.task('go', ['browserSync', 'default', 'cross'], function (){
    gulp.watch('css/*.css', ['default']);
    gulp.watch('css/*.css', ['cross']);
    gulp.watch('*.html', browserSync.reload);
});

gulp.task('cross', function () {
    return gulp.src('css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 30 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'));
});