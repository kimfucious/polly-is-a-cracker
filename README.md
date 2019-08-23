# 🦜 Polly is a Cracker [![Netlify Status](https://api.netlify.com/api/v1/badges/15921d6a-1bbb-4df5-b638-7ba0337b860a/deploy-status)](https://app.netlify.com/sites/serene-haibt-4aed40/deploys)

## About

- This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.0
- Audio handled by [howler.js](https://www.npmjs.com/package/howler)
- Base Polly code example started from [here](https://docs.aws.amazon.com/code-samples/latest/catalog/javascript-browserstart-polly.html.html)
- Humour provided by the groan-worthy, [icanhazdadjoke](https://icanhazdadjoke.com/api) API
- Voices are made possible by [Amazon Polly](https://aws.amazon.com/polly/)

## Notes

### The aws-sdk does not seem to work out of the box with Angular.

To get this working:

1. Add the following line to `polyfills.ts`:

```js
(window as any).global = window;
```

2. add @types/node package (via npm or yarn)
3. change the following line in `tsconfig.app.json`

from this:

```js
"types": []
```

to this:

```js
"types": ["node"]
```

_Your mileage may vary_

### Change detection in callbacks needs a tick in the pants

💡 I learned that change detection in Angular needs an [app.tick()](https://angular.io/api/core/ApplicationRef#tick) when the change occurs within a callback function.

### Unneeded/unwanted arguments from base code example

😑 Working from the Polly base code example [here](https://docs.aws.amazon.com/code-samples/latest/catalog/javascript-browserstart-polly.html.html), I found that the following lines where throwing errors in my angular app:

```js
var polly = new AWS.Polly({ apiVersion: "2016-06-10" });
var signer = new AWS.Polly.Presigner(speechParams, polly);
```

I wound up removing the first line and the all of the arguments on the `signer` to get things working without errors.

```js
const signer = new AWS.Polly.Presigner();
```
