const gulp = require('gulp');
const path = require('path');
// SCSS
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
// JS, VUE
const rollup = require('rollup');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const vue = require('rollup-plugin-vue');
const replace = require('@rollup/plugin-replace');
const alias = require('@rollup/plugin-alias');
const eslint = require('@rollup/plugin-eslint');
const {babel} = require('@rollup/plugin-babel');
const {terser} = require('rollup-plugin-terser');

const paths = {
  styles: {
    src: './src/scss/**/*.scss',
    dest: './dist/assets/'
  },
  js: {
    src: './src/js/main.js',
    all: './src/js/**/*.*',
    dest: './dist/assets/app.min.js'
  },
}

function processStyles(styles) {
  return (
    gulp.src(styles.src)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .on('error', sass.logError)
      .pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(styles.dest))
  );
}

function styles() {    
  return processStyles(paths.styles);
}

function js() {
  return rollup.rollup({
    input: paths.js.src,
    plugins: [
      resolve(),
      commonjs(),
      eslint(),
      vue(),
      alias({
        entries: [
          {find: '@', replacement: path.resolve('src/js')}
        ]
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.VUE_ENV': JSON.stringify(process.env.VUE_ENV || 'browser')
      }),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled'
      }),
      terser()
    ]
  }).then(bundle => {
    return bundle.write({
      file: paths.js.dest,
      format: 'umd',
      name: 'main',
      sourcemap: true,
      globals: {
        vue: 'Vue',
        vuex: 'Vuex'
      }
    });
  });
}

function watch() {
  styles();
  js();
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.js.all, js);
}

exports.styles = styles;
exports.js = js;
exports.watch = watch;
