import validate from "./validate";

export default function validateObject (schemas: any, object: any, required?: string[]) {
    return validate({
        type: "object",
        properties: schemas,
        required: required ?? Object.keys(schemas)
    }, object)
}