import Project from "../../../lib/classes/Project.class";
import templateGenerators from "../../../lib/modules/generators/templateGenerators";
//* Imports

export default async function messageCommand (project: Project, args: string[], options: any) {
    const generators = templateGenerators([
        {
            template: "whatsapp:message.ts",
            target: "lib/whatsapp/messages/replies/{{name}}.whatsapp-message.ts",
            usage: `g whatsapp:message <message-name>`,
            data: ([ name ]) => ({ name })
        },
        {
            template: "whatsapp:message.handlebars",
            target: "lib/whatsapp/messages/templates/{{name}}.whatsapp-template.handlebars",
            usage: `g whatsapp:message <message-name>`,
            data: ([ name ]) => ({ name })
        }
    ]);
    
    await generators(project, args, options);
}