# TypeScript Bundler

A Zero-configuration TypeScript transpiler and bundler.

## Features

1. Transpile `.ts` file to `.js` and `.d.ts`
2. Bundle `.js` and `.d.ts` output automatically
3. Inline and treeshaking `sideEffectFree: false` es modules which defined in `devDependencies`
4. Allow multiple `.ts` entries under `bin` or `lib` folder
5. Compress the `public` folder with `gzip`, `br2` and `webp`
6. Mangle, Prettier output code automatically
7. Generate `package.json` for the bundle
8. Generate `settings.js` from different type of config files
9. No intermediate files written on disk, keep your project folder clean
10. Improve `agentframework` performance

## How to use?
1. Install

```bash
npm i -g git+ssh://git@github.com/e2tox/tsb.git
```

2. Make your project structure similar as following:

```
Project
    |-- bin
    |    |-- cli.ts
    |    |-- ...
    |
    |-- conf
    |    |-- settings.properties
    |    |-- settings.yaml
    |    |-- ...
    |
    |-- lib
    |    |-- index.ts
    |    |-- library.ts
    |    |-- utils.ts
    |    |-- ...
    |
    |-- public
    |    |-- image.gif
    |    |-- page.html
    |    |-- embeded.js
    |    |-- ...
    |
    |-- src
    |    |-- app.ts
    |    |-- utils.ts
    |    |-- services
    |    |    |-- users.ts
    |    |    |-- groups.ts
    |    |    |-- ...
    |    |-- ...
    |
    |-- index.ts
    |-- package.json
    |-- tsconfig.json
```

2. run this command at project root

```
tsb
```

# Supported Configuration Files

- JavaScript File (settings.js)
- JSON File (settings.json)
- YAML File (settings.yaml, settings.yml)
- JSON File (settings.json)
- JSON5 File (settings.json5)
- INI File (settings.ini)
- Properties File (settings.properties)

# Report Bugs

https://github.com/e2tox/tsb/issues

Please also include a link to a sample code repository which can reproduce the issue.
