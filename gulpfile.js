const gulp = require("gulp"),
    pug = require("gulp-pug"),
    data = require('./data.json'),
    rename = require('gulp-rename');

gulp.task("pug", function () {
    return gulp.src("src/*.pug")
        .pipe(pug({locals: data}))
        .pipe(gulp.dest("dist"));
});

gulp.task("img", function () {
    if(data.img) {
        const img = data.img;
        data.img = "img/avatar" + img.substring(img.lastIndexOf("."));
        return gulp.src(data.img)
            .pipe(rename(function (path) {
                path.dirname = "img";
                path.basename = "avatar";
            }))
            .pipe(gulp.dest("dist"))
    }
});

gulp.task("default", ["img", "pug"]);