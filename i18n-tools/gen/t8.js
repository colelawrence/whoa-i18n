/// <reference path="./t8.d.ts" />

const T = {
 "reportDashboard:topbar.home": {
  "en": "Home"
 },
 "reportDashboard:topbar.reports": {
  "en": "Reports",
  "kr": "akw"
 },
 "reportDashboard:sendOutToUsers.nPeople": {
  "en": "$n people",
  "kr": "$n people",
  "vars": {
   "n": "number of people"
  }
 },
 "navbar:topbar.home": {
  "en": "Home"
 },
 "navbar:topbar.reports": {
  "en": "Reports",
  "kr": "akw"
 },
 "onboarding:firstWelcome.helloUserA": {
  "en": "Welcome to MaestroQA $firstName",
  "vars": {
   "firstName": "Example \"Camilla\""
  }
 },
 "onboarding:firstWelcome.helloUserB": {
  "en": "Welcome to MaestroQA $firstName $lastName!",
  "vars": {
   "firstName": "Example \"Jane\"",
   "lastName": "Example \"Singh\""
  }
 },
 "onboarding:secondWelcome.helloUser": {
  "en": "Welcome to MaestroQA $firstName",
  "vars": {
   "firstName": "Example \"Cole\""
  }
 }
}


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
