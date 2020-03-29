
const {
  src, dest, series, parallel, watch,
} = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const svgSprite = require('gulp-svg-sprite');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const newer = require('gulp-newer');
const browserSync = require('browser-sync').create();
const del = require('del');

sass.compiler = require('node-sass');

const source = 'src';
const build = 'build';

function html(cb) {
  src(`${source}/*.html`)
    .pipe(dest(build));
  cb();
}

function styles(cb) {
  src(`${source}/**/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      grid: 'autoplace',
    }))
    .pipe(gcmq())
    .pipe(cleanCSS({
      level: 2,
    }))
    .pipe(rename({
      extname: '.min.css',
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(dest(build));

  cb();
}

function js(cb) {
  src([`${source}/js/**/*.js`, '!**/*.min.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(sourcemaps.write('./'))
    .pipe(dest(`${build}/js`));

  src(`${source}/**/*.min.js`)
    .pipe(dest(build));

  cb();
}

function svgSpriteBuild(cb) {
  src(`${source}/icons/**/*.svg`)
    .pipe(newer(`${build}/icons/`))
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          { removeViewBox: false },
          { inlineStyles: false },
          { removeAttrs: { attrs: '(fill|stroke|style)' } },
          { removeStyleElement: true },
        ],
      }),
    ]))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: '../sprite.svg',
        },
      },
    }))
    .pipe(dest(`${build}/icons/`));

  cb();
}

function server(cb) {
  browserSync.init({
    notify: false,
    server: {
      baseDir: build,
    },
  });
  cb();
}

function watcher(cb) {
  watch(`${source}/**/*.html`).on('change', series(html, browserSync.reload));
  watch([`${source}/**/*.scss`, `${source}/**/*.css`]).on('change', series(styles, browserSync.reload));
  watch(`${source}/**/*.js`).on('change', series(js, browserSync.reload));
  watch(`${source}/img/`).on('add', series(browserSync.reload));
  watch(`${source}/icons/`).on('add', series(svgSpriteBuild, browserSync.reload));
  cb();
}

function clean() {
  return del(build);
}

exports.clean = clean;

exports.dev = series(clean, svgSpriteBuild, parallel(
  html, styles, js,
), server, watcher);

exports.build = series(clean, svgSpriteBuild, parallel(
  html, styles, js,
), server);
