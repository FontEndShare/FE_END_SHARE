import { series, src, dest } from "gulp";
import gulpSass from "gulp-sass";
import dartSass from "sass";
import autoprefixer from "gulp-autoprefixer";
import cleanCss from "gulp-clean-css";
import path from "path";

function compile() {
    let sass = gulpSass(dartSass);
    return src(path.resolve(__dirname, "./src/**/*.scss")).pipe(sass.sync()).pipe(autoprefixer()).pipe(cleanCss()).pipe(dest("./dist/css"));
}

function copyFont() {
    return src(path.resolve(__dirname, "./src/fonts/**")).pipe(dest(path.resolve(__dirname, "./dist/fonts")));
}

function scpResource() {
    return src(path.resolve(__dirname, "./dist/**")).pipe(dest(path.resolve(__dirname, "../../resources/theme-chalk")));
}
export default series(compile, copyFont, scpResource);