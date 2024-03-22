export default function isStream (obj: any) {
    return obj !== null && typeof obj === "object" && typeof obj.pipe === "function";
}