import { spawn } from "child_process";
import { root } from "./paths";
// 输出任务的自定义名称
export const withTaskName = <T>(name: string, fn: T) => Object.assign(fn, { displayName: name });

export const runCmd = (command: string) => {
    return new Promise(resolve => {
        const [cmd, ...args] = command.split(" ");
        const process = spawn(cmd, args, {
            cwd: root, // 命令执行路径
            stdio: "inherit", //直接将子进程的输出共享给父进程
            shell: true // 默认情况下linux才支持rm -rf
        });
        process.on("close", resolve);
    });
};
