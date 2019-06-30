import fs = require("fs");
import path = require("path");
import { TranslationModule, Translation } from "./types";
import { SourceFile, findSourceFiles } from "./sourceFiles";

import * as prettier from "prettier";

const warn = console.warn.bind(console, "generate.ts");

if (require.main === module) {
  main();
}

async function main() {
  const t8 = await makeT8(await findSourceFiles("."), {
    allowUnspecifiedModules: true,
    allowKeyPlaceholders: true,
    declarationsOnly: false,
    languages: ["en", "ko", "es"],
    fnName: "t8",
    fnTypeId: "t8Export"
  });

  console.log(t8);
}

export type MakeResult = {
  T: { [sourceId: string]: { [key: string]: Translation } };
  FnDecl: string;
  FnName: string;
  FnTypeId: string;
};

export async function makeT8(
  files: SourceFile[],
  opts: GenerateOptions
): Promise<MakeResult> {
  const defs: string[] = [
    `
export type Lang = ${opts.languages.map(a => `"${a}"`).join(" | ")}

export type Translation = {
  /** Variables used in template interpolation */
  vars?: {
    /** id to notes about usage */
    [id: string]: string
  }
} & {
  /** Template for language */
  [lang in Lang]?: string;
}

type T = {
  [sourceId: string]: {
    [key: string]: Translation;
  };
}

interface ${opts.fnTypeId} {
  langFallbacks: Lang[];
  lang: Lang;
}
`
  ];
  const ns = {};
  const collectEach = collectInto({ defs, ns }, opts);
  await Promise.all(files.map(collectEach));

  if (opts.allowUnspecifiedModules) {
    defs.push(`
    interface ${opts.fnTypeId} {
      /** This source does not yet exist */
      (sourceId: string): {
        /**
         * ## Default
         * Behaves the same way as looking up the key, if it's not found we use the provided placeholder and can log a warning
         */
        key(key: string, placeholder: string): {
          /** ## Default */
          s: (vars?: any) => string
        };
      };
    }
    `);
  } else {
    defs.push(`
    interface ${opts.fnTypeId} {
      /** This source does not yet exist */
      (sourceId: string): never;
    }
    `);
  }

  // we use prettier to both create nice output, and double check that our code is valid
  const t8DTSEmit = prettier.format(defs.join("\n"), {
    parser: "typescript",
    trailingComma: "es5"
  });

  return {
    T: ns,
    FnDecl: t8DTSEmit,
    FnTypeId: opts.fnTypeId,
    FnName: opts.fnName
  };
}

function collectInto(
  obj: {
    defs: string[];
    ns: { [sourceId: string]: { [key: string]: Translation } };
  },
  opts: GenerateOptions
) {
  return async function convertEach(i18nFile: SourceFile) {
    // TODO: schema validation
    const translations: TranslationModule = await i18nFile.read();
    const name: string = i18nFile.name;

    generateDefinitions(
      name,
      `Source: \`${i18nFile.path}\``,
      translations,
      tsDefs => obj.defs.push(tsDefs),
      (sourceId, key, translation) => {
        if (obj.ns[sourceId] != null) {
          // existing source
          obj.ns[sourceId][key] = translation;
        } else {
          // new source
          obj.ns[sourceId] = { [key]: translation };
        }
      },
      opts
    );
  };
}

type GenerateOptions = {
  allowUnspecifiedModules: boolean;
  allowKeyPlaceholders: boolean;
  declarationsOnly: boolean;
  languages: string[];
  fnName: string;
  fnTypeId: string;
};

function generateDefinitions(
  sourceId: string,
  notes: string,
  mod: TranslationModule,
  appendToTSDefs: (text: string) => void,
  addToTable: (sourceId: string, key: string, translation: Translation) => void,
  opts: GenerateOptions
): void {
  if (!/^[a-zA-Z_]\w+$/.test(sourceId))
    throw new Error(`Funny sourceId found "${sourceId}"`);

  let res = "";
  const append = (text: string) => (res += `${text}\n`);

  let types = "\n";
  const appendTypes = (text: string) => (types += `${text}\n`);

  append(`//#region source-${sourceId}`);
  const interfaceId = `${sourceId}TM`;
  append(`
    interface ${opts.fnTypeId} {
      /** ${notes} */
      (sourceId: "${sourceId}"): ${interfaceId};
    }
  `);
  append(`export interface ${interfaceId} {`);

  for (let id in mod) {
    for (let variant in mod[id]) {
      const trans = mod[id][variant];

      let keyName = toKeyName(id, variant);
      let docString = transToDocString(keyName, opts.languages, trans);

      addToTable(sourceId, keyName, trans);

      if (trans.vars != null) {
        // vars type
        let varsTypeId = `Tmpl${sourceId}${id}${variant}Vars`;
        let varsTypeString = varsToTypeString(trans.vars);
        appendTypes(`type ${varsTypeId} = ${varsTypeString};`);

        append(`
          ${docString}
          key(key: "${keyName}"): {
            ${docString}
            s: (vars: ${varsTypeId}) => string
          };
        `);
      } else {
        // vars was null
        append(
          `${docString}\n  key(key: "${keyName}"): {\n${docString}\n  s: () => string\n};`
        );
      }
      if (opts.allowKeyPlaceholders) {
        // generate key defaults
        // placeholder version is now deprecated
        append(`
          /** @deprecated Please remove placeholder to use i18n translations */
          key(key: "${keyName}", placeholder: string): {
            /** @deprecated Please remove placeholder to use i18n translations */
            s: (vars?: any) => string\n
          };
        `);
      } else {
        // there are no key defaults && there are defaults
        // So, we need to error on existing calls and not let them default to catch all
        append(`
          /** @deprecated Please remove placeholder to use i18n translations */
          key(key: "${keyName}", placeholder: string):
          /** @deprecated Please remove placeholder to use i18n translations */
          {
            /** @deprecated Please remove placeholder to use i18n translations */
            s: never
          };
        `);
      }
    }
  }

  if (opts.allowKeyPlaceholders) {
    append(
      ` /**
         * ## Default
         * Behaves the same way as looking up the key, if it's not found we use the provided placeholder and can log a warning
         */
        key(key: string, placeholder: string): {
          /** ## Default */
          s: (vars?: any) => string
        };`
    );
  }

  append(`}`); // close interface
  append(`//#endregion source-${sourceId}`);

  append(`//#region source-${sourceId}-types`);
  append(types);
  append(`//#endregion source-${sourceId}-types`);

  appendToTSDefs(res);
}

function toKeyName(id: string, variant: string): string {
  return `${id}.${variant}`;
}

function transToDocString(
  title: string,
  langs: string[],
  trans: Translation
): string {
  let prefix = "*No variables*";
  const vars = trans.vars;
  if (vars != null) {
    if (vars instanceof Array) {
      prefix = `Props: \`${vars.join("`, `")}\``;
    } else {
      prefix = Object.keys(vars)
        .map(key => `\`${key}\` ${vars[key] || ""}`)
        .join("\\\n * ");
    }
  }
  return `/**
  * ## ${title}
  * \`${trans.en}\`\\
  * ${prefix}\\
  * **Examples**:\\
  ${langs
    .map(lang => ` * ${lang}: "${(trans as any)[lang] || ""}"\\`)
    .join("\n")}
  */`;
}

/**
 * @returns `{ /** docs *\/ name: string, /** docs *\/ other: string }`
 */
function varsToTypeString(vars?: Translation["vars"]): string {
  if (vars != null) {
    if (typeof vars === "object") {
      return `{${Object.keys(vars)
        .map(
          k => `
  /** ${vars[k]} */
  ${k}: string,
`
        )
        .join("")}}`;
    } else {
      warn("vars defined as unexpected value:", vars);
    }
  }
  return "{} | undefined";
}
