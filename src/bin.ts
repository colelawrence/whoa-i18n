#!/usr/bin/env node

import arg = require("arg");
import { VERSION } from ".";
import { makeJS, makeTS, GenOptions, makeDTS } from "./gen";
import { findSourceFiles, globSourceFiles } from "./sourceFiles";

const args = arg({}, { stopAtPositional: true });

type CLIOptions = {
  fnName: string;
  languages: string[];
  glob: string;
  rootDir: string;
};

const DEFAULTS: CLIOptions = {
  fnName: "whoa",
  languages: ["en", "es"],
  glob: "**/*.i18n",
  rootDir: process.cwd()
};

const out = console.log.bind(console);
const err = console.error.bind(console);

const command = args._[0];
switch (command) {
  case "types":
  case "js":
  case "ts":
    const opts = DEFAULTS;
    const genOptions: GenOptions = {
      fnName: opts.fnName,
      languages: opts.languages,
      sourceFiles: globSourceFiles({ rootDir: opts.rootDir, glob: opts.glob })
    };
    switch (command) {
      case "types":
        makeDTS(genOptions).then(out);
        break;
      case "js":
        makeJS(genOptions).then(out);
        break;
      case "ts":
        makeTS(genOptions).then(out);
        break;
    }
    break;
  case undefined:
    out("no args");
    break;
  case "help":
    out(`\
Usage: whoa <command>

where <command> is one of:
    help, js, ts, types, version

whoa@${VERSION}`);
    break;
  case "version":
    out(VERSION);
    break;
  default:
    err(`Unknown command "${command}"`);
    break;
}
