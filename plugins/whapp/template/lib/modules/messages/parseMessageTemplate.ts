import { compile } from "handlebars";

export default function parseMessageTemplate (message: string, data: any) {
    return compile(message,{
        noEscape: true
    })(data);
}