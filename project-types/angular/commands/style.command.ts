import templateGenerator from "../../../lib/modules/generators/templateGenerator";

export default templateGenerator({
    template: "style.sass",
    target: "/src/styles/{{module}}/{{name}}.sass",
    usage: "g style <module> <name>",
    data: ([ module, name]) => ({ module, name }),
    open: true,
    line: 2,
    character: 4
});