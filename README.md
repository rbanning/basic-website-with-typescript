# Website w/ Typescript

This is a very bare-bones website using typescript ready for development.

Create a fork of this repo and start making magic!

## Structure

**index.html** - starting point for the app.  

**/src/** - this is where all of the scripting lives

**/public/** - for site assets (e.g. images)

#### Adding additional pages

**second.html** is an example of how you can add additional pages to the site.  For now, all 

#### Note...

The site is **very** typescript heavy, with lots of `document.createElement('...')` instead of raw HTML coding.
The site includes a custom web component, *hacky* interactivity between components/elements, and a variety of 
styling approaches.

This might not be for everyone.  

## Demo

[**view demo**](https://rbanning.github.io/basic-website-with-typescript/)

## Uses...

### Vite

Using [Vite](https://vite.dev/) to bundle the site.  See **running** and **deploying** below

### Tailwind CSS

Using [Tailwind](https://tailwindcss.com/docs/installation/using-vite) for styling.  IMPORTANT: using version 4.x


#### Note about `@apply`

> Use the @apply directive to inline any existing utility classes into your own custom CSS. This is useful when you need to write custom CSS but still want to work with your design tokens and use the same syntax you’re used to using in your HTML.  [tailwind docs](https://tailwindcss.com/docs/functions-and-directives#apply-directive)

We use `@apply` to style the anchor (`<a>`) element:
```css
a {
  @apply 
    border-b-2 border-b-slate-200 hover:border-b-teal-900
    text-teal-900 hover:text-teal-600 
    transition-colors duration-300;
}
```

This is a custom "at directives" so your IDE may complain.

If you use **vscode**, you can tell vscode about your custom directives by putting them 
in a JSON file like `.vscode/css-data.json` below:

```json
{
  "version": 1.1,
  "atDirectives": [
    {
      "name": "@tailwind",
      "description": "Use the @tailwind directive to insert Tailwind's `base`, `components`, `utilities`, and `screens` styles into your CSS."
    },
    {
      "name": "@apply",
      "description": "Use @apply to inline any existing utility classes into your own custom CSS."
    }
  ]
}
```

Then edit **`.vscode/settings.json`** ...
```JSON
{
  ...
  "css.customData": [
    "./.vscode/css-data.json"
  ],
  ...
}
```