import FButton from "./src/button.vue";

FButton.install = function (Vue: any) {
    Vue.component(FButton.name, FButton);
};

export default FButton;
