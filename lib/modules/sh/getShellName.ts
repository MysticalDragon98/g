export default function getShellName () {
    return process.env.SHELL_NAME || "default";
}