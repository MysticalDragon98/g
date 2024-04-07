//* Imports

export default function toVariableName (name: string, { capitalize = false, constCase = false } = {}) {
    if (constCase) {
        if (name.includes("-")) {
            name = name.split("-").join("_");
        }

        name = name.split("").map((char, i) => {
            if (char === char.toUpperCase() && /[a-zA-Z]/.test(char)) {
                return i === 0 ? char : `_${char}`;
            }

            return char;
        }).join("").toUpperCase();

    } else {
        if (name.includes("-")) {
            name = name.split("-").map((part, i) => i === 0 ? part : part[0].toUpperCase() + part.slice(1)).join("");
        }

        if (name.includes("_")) {
            name = name.split("_").map((part, i) => i === 0 ? part : part[0].toUpperCase() + part.slice(1)).join("");
        }

        if (capitalize) {
            name = name[0].toUpperCase() + name.slice(1);
        }
    }

    return name;
}