/// <reference path="./t8.d.ts" />
const T = {
  "favoriteFruits": {
    "ordinaryFruitNames.banana": {
      "en": "Banana",
      "es": "Plátano"
    },
    "ordinaryFruitNames.tomato": {
      "en": "Tomato",
      "es": "Tomate"
    },
    "ordinaryFruitNames.apple": {
      "en": "Apple",
      "es": "Manzana"
    },
    "orange.one": {
      "en": "Orange",
      "es": "Naranja"
    },
    "orange.two": {
      "en": "Two Oranges",
      "es": "Dos Naranjas"
    },
    "orange.three": {
      "en": "Three Oranges",
      "es": "Tres Naranjas"
    },
    "orange.other": {
      "en": "$n$ Oranges",
      "es": "$n$ Naranjas",
      "vars": {
        "n": "number of"
      }
    }
  },
  "navbar": {
    "topbar.home": {
      "en": "Home"
    },
    "topbar.reports": {
      "en": "Reports",
      "kr": "akw"
    }
  },
  "reportDashboard": {
    "topbar.home": {
      "en": "Home"
    },
    "topbar.reports": {
      "en": "Reports",
      "kr": "akw"
    },
    "sendOutToUsers.nPeople": {
      "en": "$n people",
      "kr": "$n people",
      "vars": {
        "n": "number of people"
      }
    }
  },
  "onboarding": {
    "firstWelcome.helloUserA": {
      "en": "Welcome to MaestroQA $firstName",
      "vars": {
        "firstName": "Example \"Camilla\""
      }
    },
    "firstWelcome.helloUserB": {
      "en": "Welcome to MaestroQA $firstName $lastName!",
      "vars": {
        "firstName": "Example \"Jane\"",
        "lastName": "Example \"Singh\""
      }
    },
    "secondWelcome.helloUser": {
      "en": "Welcome to MaestroQA $firstName",
      "vars": {
        "firstName": "Example \"Cole\""
      }
    }
  }
}


exports.lang = "en";

const langFallbacks = ["en"];
const warn = console.warn.bind(console, "t8 warn");
const error = console.error.bind(console, "t8 err");

exports.t8 = function t8(sourceId) {
  if (T[sourceId] == null) {
    // create unknown module
    return _createDefaultModule(sourceId);
  } else {
    // sourceId is present
    return _createExistingModule(sourceId);
  }
};

function _createExistingModule(sourceId) {
  return {
    key: (key, placeholder) => {
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
          s: vars => {
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
  }
}

function _createDefaultModule(sourceId) {
  return {
    key: (key, placeholder) => {
      if (placeholder != null) {
        // use provided
        warn(`No module (${sourceId}): key "${key}" is using placeholder "${placeholder}"`);
        
        return _applicator(placeholder);
      } else {
        error(`No module (${sourceId}): key "${key}" has no placeholder`);
        return {
          s: vars => {
            error(`Rendering: No module (${sourceId}): key "${key}" has no placeholder; see vars:`, vars);
            return "";
          }
        };
      }
    }
  }
}

function _applicator(sample) {
  return { s: vars => _applyVars(sample, vars) };
}

/** @returns Translation */
function _lookupTemplate(sourceId, key) {
  if (T[sourceId] == null) {
    error(`Source has no definitions "${sourceId}"`);
    return "";
  }
  if (T[sourceId][key] == null) {
    error(`Source key not defined "${sourceId}": "${key}"`);
    return "";
  }

  const trans = T[sourceId][key];
  const lang = exports.lang;
  if (trans[lang]) {
    return trans[lang];
  } else {
    warn("Translation for lang not found", `lang: ${lang} for: ${key}`);
    for (const fallbackLang of langFallbacks) {
      if (trans[fallbackLang]) {
        return trans[fallbackLang];
      }
    }
    error(`No translation found`, `fallbacks: ${langFallbacks} for: ${key}`);
    return "";
  }
}

/**
 * @param {string} translation
 * @param {{[id: string]: string}} vars
 */
function _applyVars(translation, vars) {
  return translation.replace(/\$(\w+)\$/g, (_, id) => vars[id]);
}
