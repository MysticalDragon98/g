{{#if required}}ok(process.env.{{name}}, 'Missing required environment variable: {{name}}');
{{/if}}export const ${{name}} = process.env.{{name}}{{#if default}} ?? "{{default}}"{{/if}};
