import templateGenerator from "../../../lib/modules/generators/templateGenerator";

export default templateGenerator({
    template: "test.ts",
    target: "test/{{module}}/{{varCap name}}.test.ts",
    usage: "g test <module> <name>",
    data: ([ module, name ]) => ({ module, name }),
    open: true
});