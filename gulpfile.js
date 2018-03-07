var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('build:sass', function () {
  return gulp.src('./public/assets/style/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/assets/style/css'));
});

gulp.task('watch', function () {
  gulp.watch('./public/assets/style/scss/**/*.scss', ['build:sass']);
});
