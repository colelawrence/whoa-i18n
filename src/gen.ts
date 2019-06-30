import * as ts from "typescript";
import { readFile } from "fs";
import { resolve } from "path";
import { Translation } from "./types";
import { makeT8, MakeResult } from "./generate";
import { SourceFile } from "./sourceFiles";

type T = {
  [moduleId: string]: {
    [key: string]: Translation;
  };
};

export type GenOptions = {
  sourceFiles: SourceFile[];
  fnName: string;
  languages: string[];
};

export async function makeJS(opts: GenOptions): Promise<string> {
  return ts.transpile(await makeTS(opts));
}

export async function makeDTS(opts: GenOptions): Promise<string> {
  const fnName = opts.fnName;
  const fnTypeId = opts.fnName + "Export";
  const t8 = await makeT8(opts.sourceFiles, {
    allowKeyPlaceholders: true,
    allowUnspecifiedModules: true,
    declarationsOnly: true,
    languages: opts.languages,
    fnName: fnName,
    fnTypeId: fnTypeId
  });

  const EXPORT = `export declare const ${fnName}: ${fnTypeId};`;

  return t8.FnDecl + "\n\n" + EXPORT;
}

export async function makeTS(opts: GenOptions): Promise<string> {
  const t8 = await make(opts);

  const fnTypeId = opts.fnName + "Export";

  return await getFnTemplate({
    fnName: opts.fnName,
    T: t8.T,
    fnTypeId: fnTypeId,
    Decl: t8.FnDecl
  });
}

async function make(opts: GenOptions): Promise<MakeResult> {
  return makeT8(opts.sourceFiles, {
    allowKeyPlaceholders: true,
    allowUnspecifiedModules: true,
    declarationsOnly: false,
    languages: opts.languages,
    fnName: opts.fnName,
    fnTypeId: opts.fnName + "Export"
  });
}

async function getFnTemplate(params: {
  fnName: string;
  fnTypeId: string;
  T: T;
  Decl: string;
}): Promise<string> {
  const T_CONST = `const T: T = ${JSON.stringify(params.T, null, 2)} as T;`;
  const EXPORT = `export const ${params.fnName} = fn as ${params.fnTypeId};`;
  return getFnTemplateContent().then(
    data =>
      replaceRegion(
        replaceRegion(data, "t", T_CONST),
        "declarations",
        params.Decl
      )
        .replace(/\bFN_NAME\b/g, params.fnName)
        .replace(/\bFN_TYPE_ID\b/g, params.fnTypeId) +
      "\n\n" +
      EXPORT
  );
}

function replaceRegion(source: string, region: string, with_: string): string {
  const regex = new RegExp(
    `//\\s*#region ${region}[\\s\\S]+?//#\\s*endregion ${region}[^\n]*`
  );

  if (!regex.test(source))
    throw new Error(`Region not found in template file "${region}"`);

  return source.replace(regex, with_);
}

async function getFnTemplateContent(): Promise<string> {
  return new Promise((res, rej) =>
    readFile(resolve(__dirname, "../templates/fn.ts"), "utf8", (err, data) => {
      if (err) rej(err);
      else res(data);
    })
  );
}
