// var gulp = require('gulp');
// var cleanCSS = require('gulp-clean-css');
// var postCss = require('gulp-postcss')
// var less = require('gulp-less');
// var rename = require('gulp-rename');
// var autoprefixer = require('gulp-autoprefixer');

// // 编译less
// gulp.task('css', function () {
//     gulp.src('./src/styles/index.less')
//         .pipe(less())
//         .pipe(autoprefixer())
//         .pipe(cleanCSS({compatibility: 'ie8'}))
//         .pipe(rename('dpzvc.css'))
//         .pipe(gulp.dest('./dist/styles'));
// });

// // 拷贝字体文件
// // gulp.task('fonts', function () {
// //     gulp.src('../src/styles/common/iconfont/fonts/*.*')
// //         .pipe(gulp.dest('../dist/styles/fonts'));
// // });

// gulp.task('default', ['css']);
const gulp = require('gulp');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function css() {
  return gulp.src('./src/styles/index.less')
    .pipe(less())                   // 编译 less
    .pipe(postcss([autoprefixer()])) // 添加前缀
    .pipe(cleanCSS({ compatibility: 'ie8' })) // 压缩
    .pipe(rename('dpzvc.css'))
    .pipe(gulp.dest('./dist/styles'));
}

// 默认任务
exports.default = css;