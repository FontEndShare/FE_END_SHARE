import path from "path";
import { outDir } from "./paths";
export const buildConfig = {
    esm: {
        module: "ESNext",
        format: "esm",
        output: {
            name: "es",
            path: path.resolve(outDir, "es")
        },
        bundle: {
            path: "fancy-ui/es"
        }
    },
    cjs: {
        module: "CommonJS",
        format: "cjs",
        output: {
            name: "cjs",
            path: path.resolve(outDir, "cjs")
        },
        bundle: {
            path: "fancy-ui/cjs"
        }
    }
};

export type BuildConfig = typeof buildConfig;
