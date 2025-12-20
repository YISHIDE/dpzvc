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