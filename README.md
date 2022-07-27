# babel-plugin-transform-preact-import  
*BPTPI for short, pronounced Bipitipy*  

[![Build and Test](https://github.com/bash/babel-plugin-transform-preact-import/actions/workflows/build.yml/badge.svg)](https://github.com/bash/babel-plugin-transform-preact-import/actions/workflows/build.yml)

> This plugin adds `import { h } from 'preact'` to files containing JSX

## Example

**In**

```js
const Title = (value) => <h1>{value}</h1>
```

**Out**

```js
import { h } from 'preact'
const Title = (value) => <h1>{value}</h1>
```

## Installation

```
npm install --save-dev babel-plugin-transform-preact-import
```

## Usage

### Via `.babelrc` (Recommended)

```json
{
  "plugins": [
    "transform-preact-import"
  ]
}
```

### Via CLI

```
babel --plugins babel-plugin-transform-preact-import script.js
```

### Via Node API

```js
require("babel-core").transform("code", {
  plugins: ["transform-preact-import"]
});
```
