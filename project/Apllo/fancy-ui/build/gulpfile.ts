import { series } from "gulp";

import { withTaskName, runCmd } from "./utils";
/**
 * 1.先清理文件
 * 2.打包样式文件
 * 3.打包工具方法
 * 4.打包所有组件
 * 5.打包每一个组件
 */
export default series(
    // 清除文件
    withTaskName("clean", async () => runCmd("rm -rf resource")),
    // 运行每一个包内的build命令
    withTaskName("buildPackages", async () => runCmd("pnpm run -F ./packages --parallel build"))
);
