import {{name}} from "{{importsRoot}}{{sourcePath}}";
{{#each imports}}
{{#if this.isFunction}}
import {{this.imports}} from "{{../importsRoot}}{{this.meta.path}}";
{{/if}}
{{/each}}

{{#each imports}}
{{#if this.isFunction}}
jest.mock("{{../importsRoot}}{{this.meta.path}}");
{{/if}}
{{/each}}

describe("{{var name}}", () => {
    it("", async () => {

    });
});