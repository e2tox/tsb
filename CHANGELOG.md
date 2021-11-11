# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- markdownlint-disable MD024 -->

## [1.0.1] - 2021-11-02

### Add

- Support AgentFramework 2.0.1

## [1.0.0-rc.6] - 2021-11-02

### Add

- Support AgentFramework 2

## [1.0.0-rc.2] - 2021-08-07

### Add

- Use typescript from project if newer
- Support inline .d.ts file
- Support typescript 4 and rollup 2
- Support custom main file for library
- Auto inline `sideEffect: free` module if in `devDependencies`
- Improve decorators performance if possible

## [0.0.8] - 2020-03-27

### Add

- Add `--inline` to inline trusted modules into output

## [0.0.7] - 2020-03-27

### Add

- Add `--mangle`, `--beautify` and `--compress` build options

## [0.0.6] - 2020-03-26

### Add

- Reformat code using prettier.

## [0.0.5] - 2020-03-22

### Fix

- Fix package.json not include 'lib' directory if there is no index.js file inside

## [0.0.4] - 2020-03-16

### Add

- Pre-compress webp, gzup and Brotli for public static content (so this build must run after frontend build)
- Prepend NOTICE file to all scripts

## [0.0.3] - 2020-03-12

### Add

- Support code split and common chunks.

## [0.0.2] - 2020-03-12

### Add

- Transpile and bundle typescript files into single js file
- Bundle type definitions into single .d.ts file
- Auto generate package.json file based on project
- Compress and mangle js file when using '--prod' options with build command, e.g. `tsb build --prod .`
- Show size changes
