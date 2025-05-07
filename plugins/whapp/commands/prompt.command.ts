import { log } from "termx";
import Project from "../../../lib/classes/Project.class";
import { OpenAIModel } from "../../../lib/openai/enum/OpenAIModel.enum";
import { askOpenAIModel } from "../../../lib/openai/modules/conversations/askOpenAIModel";
import initOpenAI from "../../../lib/openai/modules/init/initOpenAI";
import { blueBright } from "chalk";
//* Imports

export default async function promptCommand (project: Project, [ code, ...prompt ]: string[], options: any) {
    await initOpenAI();
    const message = await askOpenAIModel(OpenAIModel.GPT4o, `
        Eres un generador de mensajes de WhatsApp.

        Recibirás textos en el siguiente formato:
        > Mensaje | …botones
        Tu respuesta debe ser un mensaje amistoso y en español, pidiendo al usuario realizar la acción que en el mensaje se le solicita.
        No incluyas saludos ni despedidas, a menos que se solicite explícitamente.
        Si se incluyen botones, describelos en el mensaje.
        Si hay plantillas con formato {{...}}, déjalas tal cual en el texto, como variables.
        Usa emojis
        No realices ninguna llamada a la acción.
        Si hay excepciones especiales, explícalas sin instrucciones adicionales de “cómo proceder”.
        Objetivo de la respuesta:

        Compartir información o comentarios sin ofrecer ayuda y sin forzar interacciones adicionales.
    `, "> " + prompt.join(" "));

    console.log("PROMPT -> ", JSON.stringify(message.replace(/\&quot;/g, "\"")))

    await project.pushToFileFromTemplate("whapp:template.ts", "lib/whapp/templates.ts", {
        code,
        message: JSON.stringify(message)
    });

    log(`${blueBright(code)} = ${message.replace(/\&quot;/g, "\"")}`);
}