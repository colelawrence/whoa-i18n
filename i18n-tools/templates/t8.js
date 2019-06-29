/// <reference path="./t8.d.ts" />

/*#*/const T = {};/*#*/

exports.lang = "en";

const langFallbacks = ["en"];

exports.t8 = function t8(key) {
  return vars => applyVars(_t8(key), vars);
};

/** @returns {Translation} */
function _t8(key) {
  const trans = T[key];
  const lang = exports.lang;
  if (trans[lang]) {
    return trans[lang];
  } else {
    console.warn("Translation for lang not found", `lang: ${lang} for: ${key}`);
    for (const fallbackLang of langFallbacks) {
      if (trans[fallbackLang]) {
        return trans[fallbackLang];
      }
    }
    console.error(
      `No translation found`,
      `fallbacks: ${langFallbacks} for: ${key}`
    );
    return "";
  }
}

/**
 * @param {string} translation
 * @param {{[id: string]: value}} vars
 */
function applyVars(translation, vars) {
  return translation.replace(/\$(\w+)\$/g, (_, id) => vars[id]);
}
