import { SourceFile } from "./sourceFiles";
import { TranslationModule, Lang } from "./types";

const warn = console.warn.bind(console, 'sourceFileManager.ts')

export class SourceFileManager {
  private map: { [name: string]: SourceFile };
  constructor(private files: SourceFile[], private onChange: () => any) {
    this.map = files.reduce((map, source) => (map[source.name] = source), {});
  }

  getFiles(): SourceFile[] {
    return Object.values(this.map)
  }

  async updateKey(
    lang: Lang,
    sourceId: string,
    key: string,
    newTemplate: string
  ) {
    try {
      // parse key
      const [id, variant] = key.split(".");

      // lookup key
      const source = this.map[sourceId];
      if (source == null)
        throw new Error(`Module "${sourceId}" does not exist in sources`);

      // update in place
      const tm = await source.read();
      updateTranslationModuleTemplate(
        sourceId,
        tm,
        id,
        variant,
        lang,
        newTemplate
      );
    } catch {
      throw new Error(`malformed key "${key}"`);
    }
  }
}

function updateTranslationModuleTemplate(
  sourceId: string,
  tm: TranslationModule,
  id: string,
  variant: string,
  lang: Lang,
  template: string
) {
  const idVal = (tm[id] = tm[id] || {});
  const variantVal = (idVal[variant] = idVal[variant] || {});
  variantVal[lang] = template;

  // sanity checks on variables
  const vars = collectTextVars(variantVal.en + " " + variantVal.ko);
  const hasVars = Object.keys(vars).length > 0;

  if (hasVars) {
    variantVal.vars = {
      ...vars,
      // overwrite with existing vars
      ...variantVal.vars
    };

    const missingVars = Object.keys(variantVal.vars).filter(existingId => {
      return vars[existingId] == null;
    });

    missingVars.forEach(missingVar => {
      warn(
        `Removing var from (${sourceId}) "${id}.${variant}": { ${missingVar}: ${JSON.stringify(
          variantVal.vars[missingVar]
        )} }`
      );
      delete variantVal.vars[missingVar];
    });
  } else {
    delete variantVal.vars;
  }
}

function collectTextVars(text: string): { [id: string]: string } {
  const re = /\$(\w+)\$/g;
  let match: RegExpMatchArray = null;
  const collect: { [id: string]: string } = {};
  while ((match = re.exec(text)) != null) {
    collect[match[1]] = "no description yet";
  }

  return collect;
}
