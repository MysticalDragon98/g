import templateGenerator from "../../../lib/modules/generators/templateGenerator";

export default templateGenerator({
    template: "deployment-environment.ts",
    target: "ignition/environments/{{name}}.deployment-environment.ts",
    usage: "g deployment-env <name>",
    data: ([ name ]) => ({ name }),
    open: true
});