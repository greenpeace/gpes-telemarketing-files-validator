/* jshint esversion: 6 */
/* global require, exports */

const { src, dest, series, watch } = require('gulp');
const terser = require('gulp-terser');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const rename = require("gulp-rename");
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");

function libs() {
    return src([
        'node_modules/lodash/lodash.js',
        'node_modules/jquery/dist/jquery.js',
        'node_modules/papaparse/papaparse.js',
        'node_modules/js-sha1/build/sha1.min.js'
    ])
    .pipe(babel())
    .pipe(concat("js/libs.js"))
    .pipe(sourcemaps.init())
    .pipe(rename({ basename: "libs" }))
    .pipe(dest('./'))
    .pipe(terser())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(dest('./'));
}

function validator() {
    return src([
      'src/js/tlmkValidator.js'
    ])
    .pipe(babel())
    .pipe(concat("js/validator.js"))
    .pipe(sourcemaps.init())
    .pipe(rename({ basename: "validator" }))
    .pipe(dest('./'))
    .pipe(terser())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(dest('./'));
}

function css () {
  return src('src/css/style.css')
  .pipe(concat("css/styles.css"))
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
  .pipe(dest('./'))
  .pipe(cleanCSS())
  .pipe(rename({ suffix: ".min" }))
  .pipe(sourcemaps.write("."))
  .pipe(dest('./'));
}

function reactivation() {
    return src('src/js/reactivation.js')
    .pipe(babel())
    .pipe(concat("js/reactivation.js"))
    .pipe(sourcemaps.init())
    .pipe(rename({ basename: "reactivation" }))
    .pipe(dest('./'))
    .pipe(terser())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(dest('./'));
}

function leads() {
    return src('src/js/lead-conversion.js')
    .pipe(babel())
    .pipe(concat("js/lead-conversion.js"))
    .pipe(sourcemaps.init())
    .pipe(rename({ basename: "lead-conversion" }))
    .pipe(dest('./'))
    .pipe(terser())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(dest('./'));
}

function dtv() {
    return src('src/js/direct-tv.js')
    .pipe(babel())
    .pipe(concat("js/direct-tv.js"))
    .pipe(sourcemaps.init())
    .pipe(rename({ basename: "direct-tv" }))
    .pipe(dest('./'))
    .pipe(terser())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(dest('./'));
}

function recapture() {
    return src('src/js/recapture.js')
    .pipe(babel())
    .pipe(concat("js/recapture.js"))
    .pipe(sourcemaps.init())
    .pipe(rename({ basename: "recapture" }))
    .pipe(dest('./'))
    .pipe(terser())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(dest('./'));
}

function upgrade() {
    return src('src/js/upgrade.js')
    .pipe(babel())
    .pipe(concat("js/upgrade.js"))
    .pipe(sourcemaps.init())
    .pipe(rename({ basename: "upgrade" }))
    .pipe(dest('./'))
    .pipe(terser())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(dest('./'));
}

exports.libs = libs;
exports.validator = validator;
exports.css = css;
exports.reactivation = reactivation;
exports.leads = leads;
exports.dtv = dtv;
exports.recapture = recapture;
exports.upgrade = upgrade;
exports.default = series(libs, validator, css, reactivation, leads, dtv, recapture, upgrade);
