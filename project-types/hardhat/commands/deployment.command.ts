import templateGenerator from "../../../lib/modules/generators/templateGenerator";

export default templateGenerator({
    template: "deployment.ts",
    target: "ignition/modules/{{varCap name}}.deployment.ts",
    usage: "g deployment <deployment-name>",
    data: ([ name ]) => ({ name }),
    open: true
});