import express = require("express");

import * as gen from "./generate";
import { SourceFile, findSourceFiles } from "./sourceFiles";
import { TranslationModule } from "./types";

const app = express();

async function main() {
  const sources: SourceFile[] = await findSourceFiles(".");
  

  app.get("t8.js", (_req, res) => {
    res.contentType("application/javascript").end(gen.makeT8());
  });
}

type Lang = 'en' | 'kr'

class SourceFileManager {
  private map: { [name: string]: SourceFile }
  constructor(private files: SourceFile[], private onChange: () => any) {
    this.map = files.reduce(
      (map, source) => (map[source.name] = source),
      {}
    )
  }

  async updateKey(lang: Lang, key: string, value: string) {
    try {
      // parse key
      const [name, path] = key.split(':')
      const [id, variant] = path.split('.')

      // lookup key
      const source = this.map[name]
      if (source == null) throw new Error(`key name does not exist in sources "${name}"`)

      // update in place
      source.read()
    } catch {
      throw new Error(`malformed key "${key}"`)
    }
  }
}

function updateTranslationModule(tm: TranslationModule, id: string, variant: string, lang: Lang, text: string) {
  const idVal = tm[id] = tm[id] || {}
  const variantVal = idVal[variant] = idVal[variant] || {}
  variantVal[lang] = text

  // sanity checks on variables
  const vars = collectTextVars(variantVal.en + ' ' + variantVal.kr)

  variantVal.vars
}

function collectTextVars(text: string): string[] {
  const re = /\$(\w+)\$/g
  let match: RegExpMatchArray = null
  const collect: {[id: string]: boolean} = {}
  while (match = text.match(re)) {
    collect[match[1]] = true
  }

  return Object.keys(collect)
}

console.log(collectTextVars('$ans$ $dmd$ $dmd$'))
