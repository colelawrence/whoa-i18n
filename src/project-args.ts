import arg = require("arg");
import { resolve } from "path";
import { omitBy, isNil } from "lodash";

const args = arg({
  "--fnName": String,
  "--languages": [String],
  "--include": [String],
  "--exclude": [String],
  "--rootDir": String,

  // Aliases
  "-F": "--fnName",
  "-L": "--languages"
}, {
  permissive: true
});

export type ProjectCLIOptions = {
  fnName: string;
  languages: string[];
  include: string[];
  exclude: string[];
  rootDir: string;
};

const PROJECT_CLI_DEFAULTS: ProjectCLIOptions = {
  fnName: "whoa",
  languages: ["en", "es", "fr", "ko"],
  include: ["**/*.i18n"],
  exclude: ["**/node_modules", "**/.git", "**/.svn", "**/.hg"],
  rootDir: process.cwd()
};

const projectCLIArgs: Partial<ProjectCLIOptions> = omitBy(
  {
    fnName: args["--fnName"],
    languages:
      args["--languages"] != null
        ? flattenArgLanguages(args["--languages"])
        : undefined,
    include: args["--include"],
    exclude: args["--exclude"],
    rootDir: args["--rootDir"] != null ? resolve(args["--rootDir"]) : undefined
  },
  isNil
);

export const ARGS: {
  command: string[];
  options: ProjectCLIOptions;
} = {
  command: args._,
  options: Object.assign({}, PROJECT_CLI_DEFAULTS, projectCLIArgs)
};

export const HELP_PROJECT_OPTIONS = `\
    -F, --fnName [name]           Export name used for generated JavaScript modules${helpShowOption(
      "fnName"
    )}
    -L, --languages [langs]       List of languages (can be passed multiple times)${helpShowOption(
      "languages"
    )}
    --include [globPattern]       Configure where to look for i18n files (can be passed multiple times)${helpShowOption(
      "include"
    )}
    --exclude [globPattern]       Configure where to skip looking for i18n files (can be passed multiple times)${helpShowOption(
      "exclude"
    )}
    --rootDir [path]              Override root directory for where to find files${helpShowOption(
      "rootDir",
      "Current working directory"
    )}`;

function helpShowOption(of: keyof ProjectCLIOptions, note?: string): string {
  let currentVal = "";
  if (of in projectCLIArgs) {
    currentVal = `
                                      Using:   ${JSON.stringify(
                                        projectCLIArgs[of]
                                      )}`;
  }
  return `
                                      Default: ${JSON.stringify(PROJECT_CLI_DEFAULTS[of])}${
    note ? ` (${note})` : ""
  }${currentVal}`;
}

function flattenArgLanguages(langs: string[]): string[] {
  return langs.join(",").split(/\s*,\s*/g);
}
