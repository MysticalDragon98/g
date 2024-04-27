# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- [2024-04-27] <TS> Changed @olptools/logger to @coretools/logger because it doesnt store log files by default

## [0.1.1] - 2024-04-27

### Added
- [2024-04-27] <Angular> Added `g style-module` and `g style` command, for allowing the user to organize their styles
- [2024-04-27] <CLI Plugin> created print, printData, printJSON and printMessage functions to print data in the cli, depending of the output that the system is expecting
- [2024-04-27] <CLI Plugin> Now the cli plugin by default detects the --json, --raw and --silent flags.  It also detects whether the console is a tty or not
- [2024-04-27] g:command now opens the file in the right line & char
- [2024-04-27] When opening a file with the editor, the system can now detect which editor are you using and opens it with it
- [2024-04-27] Added option for the template generators of telling in which line & chart should the cursor start when the file is opened by the text editor


### Changed
- [2024-04-27] g:command now passes by default the spreaded args instead of the args variable. ex. args: string[] -> []: string[]


### Fixed
- [2024-04-27] Fix bug where the default cli config file was not exporting the object, but creating a json file instead
- [2024-04-14] Removed not-found import that was preventing the installation of `http` plugin

## [0.1.0] - 2024-04-14

### Added
- [2024-04-14] Added options for set line & character when opening a generated file with vscode
- [2024-04-12] Updated CLI project-type to display help under the help commands
- [2024-04-12] Now `cli` project-type creates a lib/cli/docs where documentation will be added
- [2024-04-14] Added the `style` command for ts project-type, it generates text transformers useful for colors and cli tools


### Changed
- [2024-04-14] mongo:model, fn, and interface now go directly to the file lines
- [2024-04-12] Normalize `g cli:command` and `g cli:help` interfaces to all comply with `style <command|help> <command...>`
