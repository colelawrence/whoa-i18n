//#region t
declare const T: T;
//#endregion t

//#region declarations
export type Lang = 'en' | 'es' | 'ko'

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

interface FN_TYPE_ID {
  (sourceId: string): ReturnType<typeof _createDefaultModule>;

  langFallbacks: Lang[];
  lang: Lang;
}

export { fn as FN_NAME };
//#endregion declarations


const warn = console.warn.bind(console, "FN_NAME warn");
const error = console.error.bind(console, "FN_NAME err");


const fn = function FN_NAME(sourceId: string) {
  if (T[sourceId] == null) {
    // create unknown module
    return _createDefaultModule(sourceId);
  } else {
    // sourceId is present
    return _createExistingModule(sourceId);
  }
} as FN_TYPE_ID;

fn.lang = 'en'
fn.langFallbacks = []

function _createExistingModule(sourceId: string) {
  return {
    key: (key: string, placeholder?: string) => {
      const existingTemplate = _lookupTemplate(sourceId, key);
      if (placeholder != null) {
        // use provided
        if (existingTemplate != null)
          warn("Using placeholder when a template exists", {
            sourceId,
            key,
            placeholder,
            existingTemplate
          });
        else
          warn("Using placeholder", {
            sourceId,
            key,
            placeholder,
            existingTemplate
          });

        return _applicator(placeholder);
      } else if (existingTemplate != null) {
        // use existing
        return _applicator(existingTemplate);
      } else {
        warn("No template or placeholder available", {
          sourceId,
          key
        });
        return {
          s: (vars: { [id: string]: string }) => {
            warn("Rendering: no template or placeholder available", {
              sourceId,
              key,
              vars
            });
            return "";
          }
        };
      }
    }
  };
}

function _createDefaultModule(sourceId: string) {
  return {
    key: (key: string, placeholder?: string) => {
      if (placeholder != null) {
        // use provided
        warn(
          `No module (${sourceId}): key "${key}" is using placeholder "${placeholder}"`
        );

        return _applicator(placeholder);
      } else {
        error(`No module (${sourceId}): key "${key}" has no placeholder`);
        return {
          s: (vars: { [id: string]: string }) => {
            error(
              `Rendering: No module (${sourceId}): key "${key}" has no placeholder; see vars:`,
              vars
            );
            return "";
          }
        };
      }
    }
  };
}

function _applicator(sample: string) {
  return { s: (vars: { [id: string]: string }) => _applyVars(sample, vars) };
}

function _lookupTemplate(sourceId: string, key: string): string {
  if (T[sourceId] == null) {
    error(`Source has no definitions "${sourceId}"`);
    return "";
  }

  if (T[sourceId][key] == null) {
    error(`Source key not defined "${sourceId}": "${key}"`);
    return "";
  }

  const trans = T[sourceId][key];
  const lang = fn.lang;
  const tmpl = trans[lang]
  if (tmpl) {
    return tmpl;
  } else {
    warn("Translation for lang not found", `lang: ${lang} for: ${key}`);
    for (const fallbackLang of fn.langFallbacks) {
      const tmpl = trans[fallbackLang]
      if (tmpl) {
        return tmpl;
      }
    }
    error(`No translation found`, `fallbacks: ${fn.langFallbacks} for: ${key}`);
    return "";
  }
}

/**
 * @param {string} translation
 * @param {{[id: string]: string}} vars
 */
function _applyVars(
  translation: string,
  vars: { [id: string]: string }
): string {
  return translation.replace(/\$(\w+)\$/g, (_, id) => vars[id]);
}
