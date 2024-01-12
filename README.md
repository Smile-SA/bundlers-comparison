# Introduction

The purpose of this repo is to test bundlers (features, performance, size...etc.).

We split the comparison into 2 categories:

* bundling a library
* bundling an app

# Bundling a library

The goal is to bundle a little library that:

* is built with Typescript.
* imports a JSON file.
* contains a React component:
  * it imports an image (svg) as url for an `<img/>` tag.
  * it imports a CSS file that uses an image (jpg) as background-image.
* contains a big string (that we don't want to include in the final app).

Here are a summary of the results for each tested bundlers.

## Bun 1.0.22

TypeScript: ✅
React: ✅
JSON: ✅
Image: ❗ (loaders are not all available, for example images can't be packaged as data url)
CSS: ❗ (CSS is generated, but we can't import the generated CSS files in an app because the background-image can't be found)
Image in CSS: ❌
Tree-shakable: ✅

Formats:

* Browser (UMD / IIFE) ❌ (planned)
* CJS ❌ (planned)
* ESM ✅

Output: 

* UMD: -
* CJS: -
* ESM: 34k
* CSS: 0.5k (small because there is no image)

Performance:

* UMD: -
* CJS: -
* ESM: ~200ms
* Types: ~1100ms (tsc)
* ESM + Types: ~1500ms

Comments:

* Works without configuration file, only CLI options (some options needs to be defined inside a `bunfig.toml` file).
* Only ESM format available for now.
* All esbuild loaders (like dataurl, binary, base64, copy, and empty) are not yet implemented.
* needs to set `NODE_ENV=production` (default is dev mode). (https://github.com/oven-sh/bun/issues/3768)

## esbuild 0.19.11

TypeScript: ❗ (types are not generated with the esbuild build)
React: ✅
JSON: ✅
Image: ✅
CSS: ✅
Image in CSS: ✅
Tree-shakable: ✅

Formats:

* Browser (UMD / IIFE) ✅ (not supported for libraries)
* CJS ✅
* ESM ✅

Output: 

* UMD: 34k
* CJS: 35k
* ESM: 34k
* CSS: 33k

Performance:

* UMD: ~200ms
* CJS: ~200ms
* ESM: ~200ms
* Types: ~1100ms (tsc)
* CJS + ESM + Types: ~1700ms

Comments:

* Works without configuration file, only CLI options.
* Do not generate typescript types (you need to use typescript to generate them).

## microbundle 0.15.1

TypeScript: ✅
React: ✅
JSON: ✅
Image: ❌
CSS: ❗ (CSS is generated, but we can't import the generated CSS files in an app because the background-image can't be found)
Image in CSS: ❌
Tree-shakable: ✅

Formats:

* Browser (UMD / IIFE) ✅
* CJS ✅
* ESM ✅

Output: 

* UMD: 33k
* CJS: 33k
* ESM: 33k
* CSS: 0.4k (small because there is no image)

Performance (with types):

* UMD + CJS + ESM + Types: ~4600ms

Comments:

* Built on top of Rollup.
* Cannot symlink `src` folder.

## Parcel 2.11.0

TypeScript: ✅
React: ✅
JSON: ✅
Image: ✅
CSS: ✅
Image in CSS: ✅
Tree-shakable: ❌ (https://github.com/parcel-bundler/parcel/issues/8676)

Formats:

* Browser (UMD / IIFE) ✅ (not supported for libraries)
* CJS ✅
* ESM ✅

Output: 

* UMD: -
* CJS: 37k
* ESM: 36k
* CSS: 35k

Performance (with types):

* UMD: -
* CJS: ~800ms (OR 1800ms without cache)
* ESM: ~800ms (OR 1800ms without cache)
* CJS + ESM + Types: ~800ms (OR 1800ms without cache)

Comments:

* Based on SWC.
* Works without configuration. As a result it feels magical. Sometimes you need some tries to find the good setup. There is no complete control over what is happening.
* Cannot symlink `src` folder.

## Rollup 4.9.4

TypeScript: ✅
React: ✅
JSON: ✅
Image: ✅
CSS: ✅
Image in CSS: ✅
Tree-shakable: ✅

Formats:

* Browser (UMD / IIFE) ✅
* CJS ✅
* ESM ✅

Output: 

* UMD: 34k
* CJS: 34k
* ESM: 33k
* CSS: 33k

Performance (with types):

* UMD: ~1700ms
* CJS: ~1700ms
* ESM: ~1700ms
* UMD + CJS + ESM + Types: ~1700ms

Comments:

* Based on SWC.
* Needs a lot of configuration.

## tsup 8.0.1

TypeScript: ✅
React: ✅
JSON: ✅
Image: ✅
CSS: ✅
Image in CSS: ✅
Tree-shakable: ✅

Formats:

* Browser (UMD / IIFE) ✅
* CJS ✅
* ESM ✅

Output: 

* IIFE: 164k
* CJS: 35k
* ESM: 34k
* CSS: 33k

Performance (with types):

* IIFE: ~1700ms
* CJS: ~1700ms
* ESM: ~1700ms
* IIFE + CJS + ESM + Types: ~1700ms

Comments:

* Build on top of esbuild.
* CSS support is experimental.
* Can't change output folder (must be `dist`)

## Typescript 5.3.3

TypeScript: ✅
React: ✅
JSON: ✅
Image: ❌
CSS: ❌
Image in CSS: ❌
Tree-shakable: ✅

Formats:

* Browser (UMD / IIFE) ❌
* CJS ✅
* ESM ✅

Output: 

* UMD: -
* CJS: 35k
* ESM: 33k
* Types: 0.6k

Performance (with types):

* UMD: -
* CJS: ~1100ms
* ESM: ~1100ms
* CJS + ESM + Types: ~2300ms

Comments:

* Not really a bundler, but it still can be used to generate Pure ESM packages (https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

## Vite 5.0.11

TypeScript: ✅
React: ✅
JSON: ✅
Image: ✅
CSS: ✅
Image in CSS: ✅
Tree-shakable: ✅

Formats:

* Browser (UMD / IIFE) ✅
* CJS ✅
* ESM ✅

Output: 

* UMD: 34k
* CJS: 33k
* ESM: 34k
* CSS: 33k

Performance (with types):

* UMD: ~1800ms
* CJS: ~1800ms
* ESM: ~1800ms
* UMD + CJS + ESM + Types: ~1800ms

Comments:

* Build on top of Rollup and esbuild (https://vitejs.dev/guide/why.html#why-not-bundle-with-esbuild).
* Needs little configuration.

## Webpack 5.89.0

TypeScript: ✅
React: ✅
JSON: ✅
Image: ✅
CSS: ✅
Image in CSS: ✅
Tree-shakable: ❌

Formats:

* Browser (UMD / IIFE) ✅
* CJS ✅
* ESM ✅

Output: 

* UMD: 34k
* CJS: 34k
* ESM: 34k
* CSS: 33k

Performance (with types):

* UMD: ~2600ms
* CJS: ~2600ms
* ESM: ~2600ms
* All: ~3200ms

Comments:

* Needs a lot of configuration.
* Needs multiple configurations to build into multiple formats.

# Bundling an app

The goal is to bundle an app that use our previous built library and we want:

* to test each library for each app to check the compatibility.
* to be able to have a development environment and to build for production.
* the tool to manage the HTMl file and to automatically inject needed scripts and other assets.
* to generate sourcemaps.
* to be able to generate a common chunk between all libraries (mainly containing `react` and `react-dom` dependencies).

Here are a summary of the results for each tested bundlers.

## esbuild 0.19.11

Multiple entry points: ✅
Inject script: ❌
Inject CSS: ❌
Dev server: ✅
HMR: ❗ (only watch)
Sourcemaps: ✅
Shared chunks: ❗ (only with esm format)

Output: 

* Common React chunk: 140k
* Bun: 1.5k (no CSS, no Images)
* esbuild: 1.2k + 33k
* microbundle: 0.8k (no CSS, no Images)
* Parcel: 34k + 35k ❗ (no tree-shaking)
* Rollup: 1.2k + 33k
* tsup: 1.2k + 33k
* Typescript: 0.7k (no CSS, no Images)
* Vite: 1.2k + 33k
* Webpack: 34k + 33k ❗ (no tree-shaking)

Performance (with sourcemaps):

* Build: ~300ms
* Dev: ~10ms

Comments:

* Works without configuration file, only CLI options.
* There is a watch mode for esbuild but it only works for what it bundles.
* You have ot manually manage the `index.html` file or copy assets...etc.

## Parcel 2.11.0

Multiple entry points: ✅
Inject script: ✅
Inject CSS: ✅
Dev server: ✅
HMR: ✅
Sourcemaps: ✅
Shared chunks: ✅

Output: 

* Common React chunk: 142k
* Bun: 1.8k (no CSS, no Images)
* esbuild: 1.7k + 33k
* microbundle: 1.3k + 0.4k + 43k (no component image)
* Parcel: 1.8k + 3.7k
* Rollup: 1.7k + 33k
* tsup: 1.7k + 33k
* Typescript: 1.3k (no CSS, no Images)
* Vite: 1.7k + 33k
* Webpack: 34k + 33k ❗ (no tree-shaking)

Performance (with sourcemaps):

* Build: ~900ms
* Dev: ~10ms

Comments:

* No configuration (we only need to reference the main `index.html` file that has links to other HTML files and everything is working out of the box).
* microbundle CSS is magically imported even if there is no reference of importing that file in the library or in the app... but sometimes you also get the following error: `Expected content key xxx to exist`
* Works even better with the Parcel library:
  * CSS jpg background-image is optimized.
  * Tree-shaking works (Tree-shaking for the Parcel library is not working with other bundlers).

## Rollup 4.9.4

Multiple entry points: ❗ (need to use glob)
Inject script: ❌
Inject CSS: ❌
Dev server: ❌
HMR: ❗ (only watch)
Sourcemaps: ✅
Shared chunks: ❗ (not available for "umd" or "iife" formats)

Output (with shared chunks): 

* Common React chunk: 138k
* Bun: 1k (no CSS, no Images)
* esbuild: 1.1k + 33k
* microbundle: 0.7k (no CSS, no Images)
* Parcel: 34k + 35k ❗ (no tree-shaking)
* Rollup: 1.1k + 33k
* tsup: 1.1k + 33k
* Typescript: 0.6k (no CSS, no Images)
* Vite: 1.2k + 33k
* Webpack: 34k + 33k ❗ (no tree-shaking)

Performance (with sourcemaps):

* Build: ~15000ms
* Dev: ~1000ms

Comments:

* Needs a lot of configuration.
* Like esbuild there is a watch mode but it only works for what it bundles.
* Like esbuild you have ot manually manage the `index.html` file or copy assets...etc.
* If we define multiple `input` in the configuration, we are able to generate a common chunk, but we are not able to give a name to the generated CSS and Js files and then we are not able to test the app.

## Vite 5.0.11

Multiple entry points: ✅
Inject script: ✅
Inject CSS: ✅
Dev server: ✅
HMR: ✅
Sourcemaps: ✅
Shared chunks: ✅

Output: 

* Common React chunk: 140k
* Bun: 1.3k (no CSS, no Images)
* esbuild: 1.1k + 33k
* microbundle: 0.7k (no CSS, no Images)
* Parcel: 34k + 35k ❗ (no tree-shaking)
* Rollup: 1.1k + 33k
* tsup: 1.1k + 33k
* Typescript: 0.6k (no CSS, no Images)
* Vite: 1.2k + 33k
* Webpack: 34k + 33k ❗ (no tree-shaking)

Performance (with sourcemaps):

* Build: ~1200ms
* Dev: ~10ms

Comments:

* No listing directory (but plugin `vite-plugin-list-directory-contents` exists).
* Needs little configuration.

## Webpack 5.89.0

Multiple entry points: ✅
Inject script: ❗ (inject all entry points in all HTMl files)
Inject CSS: ✅
Dev server: ✅
HMR: ✅
Sourcemaps: ✅
Shared chunks: ✅

Output: 

* [Common React chunk: 137k + 37k]
* Bun: 138k (no CSS, no Images)
* esbuild: 140k + 33k
* microbundle: 138k (no CSS, no Images)
* Parcel: 173k + 35k ❗ (no tree-shaking)
* Rollup: 140k + 33k
* tsup: 140k + 33k
* Typescript: 138k (no CSS, no Images)
* Vite: 140k + 33k
* Webpack: 173k + 33k ❗ (no tree-shaking)

Performance (with sourcemaps):

* Build: ~7000ms
* Dev: ~500ms

Comments:

* Listing directory included.
* Needs a lot of configuration.
* We need to define `chunks: []` in the `HtmlWebpackPlugin` configuration to avoid that plugin to inject all library scripts in all apps.
* Thus we can't use the configuration to generate a common chunk here (and be able to test the app).

## Other tools

### Bun, microbundle, tsup, Typescript

Comments:

* Maybe they can be used to bundle an app, but we also want a dev server with HMR...etc.
* You can still, like esbuild and Rollup, manage to have a watch mode but it won't be enough for a good developer experience.
* These libraries are only intended to be used to bundle a library.

### WMR

Comments:

* It is only for Preact.
* It is only for bundling an app (and not a library).
* It does not seems to work in a monorepo.

### Turbopack

Comments:

* Only available as an option in the Next.js tool chain for now.
* Still in beta.

### Browserify

Comments:

* It is only for bundling an app (and not a library).
* But it does not have any dev feature we want.

### Gulp, Grunt

Comments:

* They are more workflow tools than bundlers, used to defined tasks and the links between them (they are now mainly replaced by npm scripts).
* They require a lot of configuration.
* They are definitely better dedicated tools for our test cases (bundling a JS library and a JS app).

### Brunch, Snowpack, Packem, pkg...etc.

Comments

* These tools are not maintained any more.
