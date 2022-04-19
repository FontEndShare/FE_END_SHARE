"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withInstall = void 0;
const withInstall = (component) => {
    component.install = function (app) {
        app.component(component.name, component);
        return component;
    };
};
exports.withInstall = withInstall;
