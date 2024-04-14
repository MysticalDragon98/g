# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
## [0.1.2] - 2024-04-14

### Added
- [2024-04-14] `cli` plugin now has documentation & settings

## [0.1.1] - 2024-04-14

### Added
- [2024-04-14] `g plugin cli` now creates a `lib/cli/docs/help` folder and a `cli.config.ts` for cli improvements
- [2024-04-14] Added the `style` command for ts project-type, it generates text transformers useful for colors and cli tools


### Changed
- [2024-04-14] `cli:command` now takes arguments as subcommands, instead of dots. Ex. `g cli:command set.name` --> `g cli:command set name`


### Fixed
- [2024-04-14] Removed not-found import that was preventing the installation of `http` plugin

## [0.1.0] - 2024-04-14

### Added
- [2024-04-14] Added options for set line & character when opening a generated file with vscode
- [2024-04-12] Updated CLI project-type to display help under the help commands
- [2024-04-12] Now `cli` project-type creates a lib/cli/docs where documentation will be added


### Changed
- [2024-04-14] mongo:model, fn, and interface now go directly to the file lines
- [2024-04-12] Normalize `g cli:command` and `g cli:help` interfaces to all comply with `style <command|help> <command...>`
