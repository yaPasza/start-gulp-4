const { src, dest, watch, parallel, series } = require('gulp');


// Plugins connection
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');



// JS Task
function scripts() {
    return src([
        'app/js/main.js',
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

// CSS Task
function styles() {
    return src('app/scss/style.scss')
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
        .pipe(concat('style.min.css'))
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
};

// Task to monitor changes
function watching() {
    watch(['app/scss/style.scss'], styles)
    watch(['app/js/main.js'], scripts)
    watch(['app/**/*.html']).on('change', browserSync.reload)
}

// Browser window update task
function browsersync() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}

// Collecting files in the dist folder
function building() {
    return src([
        'app/css/style.min.css',
        'app/js/main.min.js',
        'app/**/*.html'
    ], { base: 'app' })
        .pipe(dest('dist'))
}

// Delete dir task
function cleanDist() {
    return src('dist')
        .pipe(clean())
}

// Task export
exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;

exports.build = series(cleanDist, building);
// Task default export
exports.default = parallel(styles, scripts, browsersync, watching);