import templateGenerator from "../../../lib/modules/generators/templateGenerator";

export default templateGenerator({
    template: "cli:command-help.ts",
    target: "lib/cli/docs/help/{{path}}.command-help.ts",
    usage: "g cli:help <command>",
    data: ([...command]) => ({
        path: command.join("."),
        command: command.join(" ")
    }),
    open: true
});