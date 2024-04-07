import templateGenerator from "../../../lib/modules/generators/templateGenerator";

export default templateGenerator({
    template: "contract.sol",
    target: "contracts/{{module}}/{{varCap name}}.sol",
    usage: "g contract <module> <contract-name>",
    data: ([ module, name ]) => ({ module, name }),
    open: true
});