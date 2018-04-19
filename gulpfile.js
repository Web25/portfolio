const gulp = require("gulp"),
    pug = require("gulp-pug"),
    data = require('./data.json'),
    rename = require('gulp-rename');
const download = require("gulp-download");
const hashManifest = require('gulp-json-hash-manifest');

gulp.task("pug", ["css"], function () {
    return gulp.src("src/*.pug")
        .pipe(pug({locals: {
                data: data,
                integrity: require("./build/integrity/hash-manifest")
            }}))
        .pipe(gulp.dest("build/dist"));
});

gulp.task("css", function() {
    return download('https://www.w3schools.com/w3css/4/w3.css')
        .pipe(hashManifest({
            dest: "build/integrity",
            hash: "sha512",
            encoding: "base64",
            prependAlgorithm:true
        }))
        .pipe(gulp.dest('build/dist/css/'))
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
            .pipe(gulp.dest("build/dist"))
    }
});

gulp.task("default", ["img", "pug"]);