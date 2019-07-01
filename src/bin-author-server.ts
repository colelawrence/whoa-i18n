#!/usr/bin/env node

import { VERSION } from ".";
import { GenOptions } from "./gen";
import { findSourceFiles } from "./sourceFiles";
import { ARGS, ProjectCLIOptions, HELP_PROJECT_OPTIONS } from "./project-args";
import { start } from "./author-server";

const out = console.log.bind(console);
const err = console.error.bind(console);

const command = ARGS.command[0];

const HELP = `\
Usage: whoa-author-server [options]
       whoa-author-server <command> [options]

where <command> is one of:
    help, version

and [options] might include:
${HELP_PROJECT_OPTIONS}

whoa-author-server@${VERSION}`;

const args = ARGS.command.slice(1);
if (args.length > 0) {
  err(`Unrecognized additional args: ${args}\n\n${HELP}`)
  process.exit(1)
}

const cliOptions = ARGS.options;
switch (command) {
  case undefined:
    execute(cliOptions);
    break;
  case "help":
    out(HELP);
    break;
  case "version":
    out(VERSION);
    break;
  default:
    err(`Unknown command "${command}"\n\n${HELP}`);
    process.exit(1)
}

async function execute(opts: ProjectCLIOptions) {
  const genOptions: GenOptions = {
    fnName: opts.fnName,
    languages: opts.languages,
    sourceFiles: await findSourceFiles({
      rootDir: opts.rootDir,
      include: opts.include,
      exclude: opts.exclude
    })
  };

  start(genOptions)
}
