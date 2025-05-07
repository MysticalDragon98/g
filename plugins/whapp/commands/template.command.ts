import { log } from "termx";
import Project from "../../../lib/classes/Project.class";
import { askOpenAIModel } from "../../../lib/openai/modules/conversations/askOpenAIModel";
import { OpenAIModel } from "../../../lib/openai/enum/OpenAIModel.enum";
import { blueBright } from "chalk";
//* Imports


export default async function templateCommand (project: Project, [ code, ...message ]: string[], options: { mode?: string }) {

    const response = options.mode === "raw"? message.join(" ") : await askOpenAIModel(OpenAIModel.GPT4o, `
        Eres un generador de mensajes de WhatsApp.

        Recibirás textos en el siguiente formato:
        > Mensaje | …botones
        Tu respuesta debe ser un mensaje amistoso y en español, que comparta la información de manera clara.
        No incluyas saludos ni despedidas, a menos que se solicite explícitamente.
        No ofrezcas ni sugieras ayuda, solo presenta los datos de forma informativa.
        Si se incluyen botones, descríbelos de forma natural (por ejemplo: “Tienes estas opciones:” seguido de una breve descripción).
        Si hay plantillas con formato {{...}}, déjalas tal cual en el texto, como variables.
        Puedes usar emojis si lo deseas.
        No realices ninguna llamada a la acción.
        Si hay excepciones especiales, explícalas sin instrucciones adicionales de “cómo proceder”.
        Objetivo de la respuesta:

        Compartir información o comentarios sin ofrecer ayuda y sin forzar interacciones adicionales.
    `, "> " +message.join(" "));

    await project.pushToFileFromTemplate("whapp:template.ts", "lib/whapp/templates.ts", {
        code,
        message: JSON.stringify(response.replace(/\&quot;/g, "\""))
    });


    log(`${blueBright(code)} = ${response.replace(/\&quot;/g, "\"")}`);
}