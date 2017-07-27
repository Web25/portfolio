const gulp = require("gulp"),
    pug = require("gulp-pug"),
    data = require('./data.json');

gulp.task("pug", function () {
    return gulp.src("src/*.pug")
        .pipe(pug({locals: data}))
        .pipe(gulp.dest("dist"))
});

gulp.task("default", ["pug"]);