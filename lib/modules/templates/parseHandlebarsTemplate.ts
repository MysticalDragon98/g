import Handlebars from "handlebars";
import { compile } from "handlebars";
import toVariableName from "../utils/toVariableName";


export default function parseHandlebarsTemplate (template: string, data: any, options: { noEscape?: boolean } = {}) {
    const handlebars = compile(template, options);

    return handlebars(data);
}

Handlebars.registerHelper("var", (str) => toVariableName(str));
Handlebars.registerHelper("varCap", (str) => toVariableName(str, { capitalize: true }));
Handlebars.registerHelper("varConst", (str) => toVariableName(str, { constCase: true }));
Handlebars.registerHelper("varSnake", (str) => toVariableName(str, { snakeCase: true }));