import Project from "../../../lib/classes/Project.class";
import insertTagLine from "../../../lib/modules/fs/insertTagLine";
import toVariableName from "../../../lib/modules/utils/toVariableName";
//* Imports

export default async function messageTemplateCommand (project: Project, args: string[], options: any) {
    const [ name ] = args;
    const templatePath = `lib/message-templates/${name}.handlebars`;

    await project.ensureDir("lib/message-templates");

    await insertTagLine(
        project.subPath("lib/enum/MessageTemplate.enum.ts"),
        "Message Templates",
        `${toVariableName(name, { capitalize: true })} = "${name}",`
    );

    await insertTagLine(
        project.subPath("lib/const/TemplateButtons.const.ts"),
        "Template Buttons",
        `[MessageTemplate.${toVariableName(name, { capitalize: true })}]: [],` 
    );

    await project.generateFileFromTemplate("whapp:message-template.handlebars", templatePath, {});
    await project.vscodeOpen(templatePath);
}