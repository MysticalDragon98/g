import createContract from "../../../plugins/web3/contracts";

{{#if static}}import { ${{envvar}} } from "../../env";
{{/if}}
{{#if static}}const {{varCap name}}Contract = createContract("{{name}}", ${{envvar}});
{{else}}const {{varCap name}}Contract = (addr: string) => createContract("{{name}}", addr);{{/if}}

export default {{varCap name}}Contract;