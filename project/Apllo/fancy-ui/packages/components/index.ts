import Button from "./button";

const components = [Button];

const install = function (Vue: any) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
};

export default {
    Button,
    install
};
