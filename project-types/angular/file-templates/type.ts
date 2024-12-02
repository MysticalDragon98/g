{{#if unique}}export type {{varCap name}} = string & { readonly __brand: unique symbol }{{else}}export type {{varCap name}} = {
    
}{{/if}}