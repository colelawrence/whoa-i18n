#!/usr/bin/env node

import { VERSION } from ".";
import { makeJS, makeTS, GenOptions, makeDTS, makeSchema } from "./gen";
import { findSourceFiles } from "./sourceFiles";
import { ARGS, ProjectCLIOptions, HELP_PROJECT_OPTIONS } from "./project-args";

type GenCommand = "types" | "schema" | "js" | "ts";

const out = console.log.bind(console);
const err = console.error.bind(console);

const command = ARGS.command[0];

const HELP = `\
Usage: whoa <command> [options]

where <command> is one of:
    help, js, schema, ts, types, version

and [options] might include:
${HELP_PROJECT_OPTIONS}

whoa@${VERSION}`;

const args = ARGS.command.slice(1);
if (args.length > 0) {
  err(`Unrecognized additional args: ${args}\n\n${HELP}`)
  process.exit(1)
}

const cliOptions = ARGS.options;
switch (command) {
  case "types":
  case "schema":
  case "js":
  case "ts":
    execute(command, cliOptions);
    break;
  case undefined:
    out("no args");
    break;
  case "help":
    out(HELP);
    break;
  case "version":
    out(VERSION);
    break;
  default:
    err(`Unknown argument "${command}"\n\n${HELP}`);
    process.exit(1)
}

async function execute(command: GenCommand, opts: ProjectCLIOptions) {
  const genOptions: GenOptions = {
    fnName: opts.fnName,
    languages: opts.languages,
    sourceFiles: await findSourceFiles({
      rootDir: opts.rootDir,
      include: opts.include,
      exclude: opts.exclude
    })
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
    case "schema":
      makeSchema(genOptions).then(out);
      break;
  }
}
