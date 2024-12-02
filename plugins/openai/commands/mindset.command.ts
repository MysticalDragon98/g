import templateGenerator from "../../../lib/modules/generators/templateGenerator";

export default templateGenerator({
    template: "openai:mindset.ts",
    target: "lib/openai/mindsets/{{name}}.openai-mindset.ts",
    usage: "g openai:mindset <mindset-name>",
    data: ([ name ]) => ({ name }),
    open: true
});