import gulp, { series } from "gulp";
import ts from "gulp-typescript";
import path from "path";
import { root } from "@fancy-ui/build/paths";
import { buildConfig } from "@fancy-ui/build/config";

const { parallel, src, dest } = gulp;

const input = ["./src/*.ts"];
const tasks = Object.entries(buildConfig).map(([module, config]) => {
    const output = path.resolve(__dirname, config.output.name);
    return series(() => {
        const tsConfig = path.resolve(root, "tsconfig.json");
        return src(input)
            .pipe(
                ts.createProject(tsConfig, {
                    declaration: true,
                    strict: false,
                    module: config.module
                })()
            )
            .pipe(dest(output));
    });
});
export default parallel(...tasks);
