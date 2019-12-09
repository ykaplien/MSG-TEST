'use strict';

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

async function styles () {
    gulp.src('./src/scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css'))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());

}

async function js () {
    gulp.src('src/js/app.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
           baseDir: "./",
           index: "/index.html"
        }
    });
    gulp.watch('src/scss/*.scss', styles)
    gulp.watch('./*.html').on('change',browserSync.reload);
    gulp.watch('./src/js/*.js', js);
}

exports.build = gulp.parallel(styles, js);
exports.styles = styles;
exports.watch = watch;