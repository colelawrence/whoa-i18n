import fs = require("fs");
import path = require("path");
import { TranslationModule, Translation } from "./types";
import { SourceFile, findSourceFiles } from "./sourceFiles";

import * as prettier from "prettier";

const t8JSTemplate = fs.readFileSync(path.resolve("templates/t8.js"), "utf8");

const warn = console.warn.bind(console, "generate.ts");

if (require.main === module) {
  main();
}

async function main() {
  const t8 = await makeT8(await findSourceFiles("."), {
    allowUnspecifiedModules: true,
    allowKeyPlaceholders: true
  });
  Promise.all([
    fs.promises.writeFile(path.resolve("gen/t8.d.ts"), t8.t8DTSEmit),
    fs.promises.writeFile(
      path.resolve("gen/t8.js"),
      '/// <reference path="./t8.d.ts" />\n' + t8.t8JSEmit
    )
  ]);
}

export async function makeT8(files: SourceFile[], opts: GenerateOptions) {
  const defs = [];
  const ns = {};
  const collectEach = collectInto({ defs, ns }, opts);
  await Promise.all(files.map(collectEach));

  if (opts.allowUnspecifiedModules) {
    defs.push(`
    /** This source does not yet exist */
    export declare function t8(sourceId: string): {
      /**
       * ## Default
       * Behaves the same way as looking up the key, if it's not found we use the provided placeholder and can log a warning
       */
      key(key: string, placeholder: string): {
        /** ## Default */
        s: (vars?: any) => string
      };
    };
    `);
  } else {
    defs.push(`
    /** This source does not yet exist */
    export declare function t8(sourceId: string): never;
    `);
  }

  const t8JSEmit = t8JSTemplate.replace(
    "/*#*/ const T = {}; /*#*/",
    `const T = ${JSON.stringify(ns, null, 2)}\n`
  );

  // we use prettier to both create nice output, and double check that our code is valid
  const t8DTSEmit = prettier.format(defs.join("\n"), {
    parser: "typescript",
    trailingComma: "es5"
  });

  return { t8JSEmit, t8DTSEmit };
}

function collectInto(
  obj: {
    defs: string[];
    ns: { [key: string]: Translation };
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
  allowUnspecifiedModules?: boolean;
  allowKeyPlaceholders?: boolean;
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
  const append = text => (res += `${text}\n`);

  let types = "\n";
  const appendTypes = text => (types += `${text}\n`);

  append(`//#region source-${sourceId}`);
  const interfaceId = `${sourceId}TM`;
  append(`/** ${notes} */`);
  append(
    `export declare function t8(sourceId: "${sourceId}"): ${interfaceId};`
  );
  append(`export interface ${interfaceId} {`);

  for (let id in mod) {
    for (let variant in mod[id]) {
      const trans = mod[id][variant];

      let keyName = toKeyName(id, variant);
      let docString = transToDocString(keyName, trans);

      addToTable(sourceId, keyName, trans);

      if (trans.vars != null) {
        // vars type
        let varsTypeId = `T8${sourceId}${id}${variant}Vars`;
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

      // key to string
      // key to JSX
      // append(
      //   `${docString}\ndeclare function t8x(key: "${keyName}"): (vars: ${varsType}) => JSX.Element;`
      // );
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

function transToDocString(title: string, trans: Translation): string {
  let prefix = "*No variables*";
  if (trans.vars != null) {
    if (trans.vars instanceof Array) {
      prefix = `Props: \`${trans.vars.join("`, `")}\``;
    } else {
      prefix = Object.keys(trans.vars)
        .map(key => `\`${key}\` ${trans.vars[key]}`)
        .join("\\\n * ");
    }
  }
  return `/**\n * ## ${title}\n * \`${
    trans.en
  }\`\\\n * ${prefix}\\\n * **Examples**:\\\n * en: "${trans.en ||
    ""}";\\\n * kr: "${trans.ko || ""}"; */`;
}

/**
 * @returns "{ /** docs *\/ name: string, /** docs *\/ other: string }"
 */
function varsToTypeString(vars?: Translation["vars"]): string {
  if (vars != null) {
    if (typeof vars === "object") {
      return `{${Object.keys(vars)
        .map(k => `\n  /** ${vars[k]} */\n  ${k}: string,\n`)
        .join("")}}`;
    } else {
      warn("vars defined as unexpected value:", vars);
    }
  }
  return "{} | undefined";
}
