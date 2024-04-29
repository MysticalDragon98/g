import insertTagLine from "../../../lib/modules/fs/insertTagLine";
import templateGenerator from "../../../lib/modules/generators/templateGenerator";

export default templateGenerator({
    template: "fn.sh",
    target: "lib/modules/{{varSnake module}}/{{varSnake name}}.sh",
    usage: "g fn <module> <name>",
    data: ([ module, name ]) => ({ module, name }),
    open: true,

    async afterGenerate(project, data, options) {
        const importString = `. ./${options.target}`;
        
        await insertTagLine(
            project.subPath("index.sh"),
            "Imports",
            importString,
            { extension: "sh" }
        );
    },

    line: 2,
    character: 4
});