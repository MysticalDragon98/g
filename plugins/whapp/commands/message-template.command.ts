import Project from "../../../lib/classes/Project.class";
import insertTagLine from "../../../lib/modules/fs/insertTagLine";
import toVariableName from "../../../lib/modules/utils/toVariableName";
//* Imports

export default async function messageTemplateCommand (project: Project, args: string[], options: any) {
    const [ name ] = args;
    const templatePath = `lib/whapp/message-templates/${name}.handlebars`;

    await project.ensureDir("lib/whapp/message-templates");

    await insertTagLine(
        project.subPath("lib/whapp/MessageTemplate.enum.ts"),
        "Message Templates",
        `${toVariableName(name, { capitalize: true })} = "${name}",`
    );

    await project.generateFileFromTemplate("whapp:message-template.handlebars", templatePath, {});
    await project.vscodeOpen(templatePath);
}