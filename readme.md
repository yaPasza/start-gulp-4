# START-GULP-4

A starter kit for frontend developing.

### Import new style files in CSS:
```@import '../../node_modules/example/example-style';```

### Import new script files in JS:
```
function scripts() {
    return src([
        'node_modules/example/example-script',
        'app/js/main.js'
        ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}
```
