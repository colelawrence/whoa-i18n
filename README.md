# ![whoa i18n](logo.svg)

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

> Simple and ergonomic tooling for managing translations.

## Installation

```sh
# Locally in your project
npm install -D whoa-i18n

# Or globally
npm install -g whoa-i18n
```

**Tip:** Installing modules locally allows you to control and share the versions through `package.json`.

## Usage

```sh
# Generate types into a declaration file
whoa types > whoa.d.ts

# Generate declaration compatible JavaScript into a file
whoa js > whoa.js

# Generate strict TypeScript into a file
whoa ts > whoa.ts

# Generate i18n schema into a file
whoa schema > i18n.schema.json

# Start an author-server
whoa author-server
```

## i18n files

### Structure

The basic `i18n` file consists of a filename (sans extension), and a content body following a YAML structure.

`favoriteFruits.i18n`
```yaml
orange:
  one:
    en: Orange
    es: Naranja
  two:
    en: Two Oranges
    es: Dos Naranjas
  three:
    en: Three Oranges
    es: Tres Naranjas
  other:
    vars:
      n: number of
    en: $n$ Oranges
    es: $n$ Naranjas
```

This translation can then be accessed in your `client.html` code

```js
const whoa = require("./whoa")

whoa("favoriteFruits").key("orange.one").s()
//=> Orange
whoa("favoriteFruits").key("orange.other").s({ n: '8' })
//=> 8 Oranges

// Change language
whoa.lang = "es"

whoa("favoriteFruits").key("orange.one").s()
//=> Naranja
whoa("favoriteFruits").key("orange.other").s({ n: '8' })
//=> 8 Naranjas

// If our translation file does not support a key, we can pass in a placeholder template
whoa("favoriteFruits").key("grapes.one", "Grape").s()
//=> Grape
whoa("favoriteFruits").key("grapes.other", "$n$ Grapes").s({ s: '5' })
//=> 5 Grapes
```

### Authoring in VS Code

Authoring in VS Code and other editors may be very similar.

An easy way to get started is to generate a schema file to check your translation yaml files.

```sh
# Generate a JSON schema file for two locales "en" (English) and "es" (Spanish)

whoa -L en,es schema > i18n.schema.json
```

Then, with our editor we can set up a yaml plugin like `redhat.vscode-yaml` to validate all our `**/*.i18n` files to that schema.
And, ensure that all `*.i18n` files are associated to `yaml`.

`.vscode/settings.json`
```json
{
    "yaml.schemas": {
        "./i18n.schema.json": "**/*.i18n"
    },
    "files.associations": {
        "*.i18n": "yaml"
    }
}
```
