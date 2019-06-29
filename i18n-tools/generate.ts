import fs = require("fs");
import path = require("path");
import { TranslationModule, Translation } from "./types";
import { SourceFile, findSourceFiles } from "./sourceFiles";

const t8JSTemplate = fs.readFileSync(
  path.resolve(__dirname, "templates/t8.js"),
  "utf8"
);

const warn = console.warn.bind(console, "generate.ts");

if (require.main === module) {
  main();
}

async function main() {
  const t8 = await makeT8(findSourceFiles("."));
  Promise.all([
    fs.promises.writeFile(path.resolve(__dirname, "gen/t8.d.ts"), t8.t8DTSEmit),
    fs.promises.writeFile(path.resolve(__dirname, "gen/t8.js"), t8.t8JSEmit)
  ]);
}

export async function makeT8(files: SourceFile[]) {
  const defs = [];
  const ns = {};
  const collectEach = collectInto({ defs, ns });
  await Promise.all(files.map(collectEach));

  const t8JSEmit = t8JSTemplate.replace(
    "/*#*/const T = {};/*#*/",
    `const T = ${JSON.stringify(ns, null, 1)}\n`
  );
  const t8DTSEmit = defs.join("\n");

  return { t8JSEmit, t8DTSEmit };
}

function collectInto(obj: {
  defs: string[];
  ns: { [key: string]: Translation };
}) {
  return async function convertEach(i18nFile: SourceFile) {
    // TODO: schema validation
    const translations: TranslationModule = await i18nFile.read();
    const name: string = i18nFile.name;

    generateDefinitions(
      name,
      translations,
      tsDefs => obj.defs.push(tsDefs),
      (key, translation) => {
        obj.ns[key] = translation;
      }
    );
  };
}

function generateDefinitions(
  name: string,
  mod: TranslationModule,
  appendToTSDefs: (text: string) => void,
  addToTable: (key: string, translation: Translation) => void
): void {
  let res = `// From "${name}"\n`;
  const append = text => (res += `${text}\n`);

  for (let id in mod) {
    for (let variant in mod[id]) {
      const trans = mod[id][variant];

      let docString = transToDocString(trans);
      let keyName = toKeyNameLong(name, id, variant);

      addToTable(keyName, trans);

      if (trans.vars != null) {
        // vars type
        let varsType = varsToTypeString(trans.vars);
        let varsTypeId = `T8${id}${variant}Vars`
        append(`type ${varsTypeId} = ${varsType};`)

        append(
          `${docString}\nexport declare function t8(key: "${keyName}"): (vars: ${varsTypeId}) => string;`
        );
      } else {
        // vars was null
        append(
          `${docString}\nexport declare function t8(key: "${keyName}"): () => string`
        );
      }

      // key to string
      // key to JSX
      // append(
      //   `${docString}\ndeclare function t8x(key: "${keyName}"): (vars: ${varsType}) => JSX.Element;`
      // );
    }
  }

  appendToTSDefs(res);
}

function toKeyNameLong(name: string, id: string, variant: string): string {
  return `${name}:${id}.${variant}`;
}

function toKeyName(id: string, variant: string): string {
  return `${id}.${variant}`;
}

function transToDocString(trans: Translation): string {
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
  return `/**\n * ${prefix}\\\n * **Examples**:\\\n * en: "${trans.en ||
    ""}";\\\n * kr: "${trans.kr || ""}"; */`;
}

/**
 * @returns "{ /** docs *\/ name: string, /** docs *\/ other: string }"
 */
function varsToTypeString(vars?: Translation["vars"]): string {
  if (vars != null) {
    if (typeof vars === "object") {
      return `{${Object.keys(vars)
        .map(k => `\n  /** ${vars[k]} */\n  ${k}: string,\n`)
        .join('')}}`;
    } else {
      warn("vars defined as unexpected value:", vars);
    }
  }
  return "{} | undefined";
}
