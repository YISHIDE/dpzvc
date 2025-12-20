// const gulp = require('gulp');
// const less = require('gulp-less');
// const cleanCSS = require('gulp-clean-css');
// const rename = require('gulp-rename');
// const postcss = require('gulp-postcss');
// const autoprefixer = require('autoprefixer');

// function css() {
//   return gulp.src('./src/styles/index.less')
//     .pipe(less())                   // 编译 less
//     .pipe(postcss([autoprefixer()])) // 添加前缀
//     .pipe(cleanCSS({ compatibility: 'ie8' })) // 压缩
//     .pipe(rename('dpzvc.css'))
//     .pipe(gulp.dest('./dist/styles'));
// }

// // 默认任务
// exports.default = css;


const gulp = require('gulp');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

// 打包组件 CSS
function componentsCSS() {
  return gulp.src('./src/styles/components/*.less')
    .pipe(less())
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ dirname: '', extname: '.css' }))
    .pipe(gulp.dest('./dist/styles/components'));
}

// 打包 base CSS
function baseCSS() {
  return gulp.src('./src/styles/base/*.less')
    .pipe(less())
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ dirname: '', extname: '.css' }))
    .pipe(gulp.dest('./dist/styles/base'));
}

// 打包 utils CSS
function utilsCSS() {
  return gulp.src('./src/styles/utils/*.less')
    .pipe(less())
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ dirname: '', extname: '.css' }))
    .pipe(gulp.dest('./dist/styles/utils'));
}

// 打包全局 index.less
function globalCSS() {
  return gulp.src('./src/styles/index.less')
    .pipe(less())
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename('dpzvc.css'))
    .pipe(gulp.dest('./dist/styles'));
}

// 默认任务
exports.default = gulp.parallel(globalCSS, componentsCSS, baseCSS, utilsCSS);