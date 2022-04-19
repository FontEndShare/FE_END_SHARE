import type { App, Plugin } from "vue";

type SFCWithInstall<T> = T & Plugin;

export const withInstall = <T>(component: T) => {
    (component as SFCWithInstall<T>).install = function (app: App) {
        app.component((component as any).name, component);
        return component as SFCWithInstall<T>;
    };
};
