"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var T = {
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
            "ko": "akw"
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
    },
    "reportDashboard": {
        "topbar.home": {
            "en": "Home"
        },
        "topbar.reports": {
            "en": "Reports",
            "ko": "akw"
        },
        "sendOutToUsers.nPeople": {
            "en": "$n people",
            "ko": "$n people",
            "vars": {
                "n": "number of people"
            }
        }
    }
};
var warn = console.warn.bind(console, "whoa warn");
var error = console.error.bind(console, "whoa err");
var fn = function whoa(sourceId) {
    if (T[sourceId] == null) {
        // create unknown module
        return _createDefaultModule(sourceId);
    }
    else {
        // sourceId is present
        return _createExistingModule(sourceId);
    }
};
fn.lang = 'en';
fn.langFallbacks = [];
function _createExistingModule(sourceId) {
    return {
        key: function (key, placeholder) {
            var existingTemplate = _lookupTemplate(sourceId, key);
            if (placeholder != null) {
                // use provided
                if (existingTemplate != null)
                    warn("Using placeholder when a template exists", {
                        sourceId: sourceId,
                        key: key,
                        placeholder: placeholder,
                        existingTemplate: existingTemplate
                    });
                else
                    warn("Using placeholder", {
                        sourceId: sourceId,
                        key: key,
                        placeholder: placeholder,
                        existingTemplate: existingTemplate
                    });
                return _applicator(placeholder);
            }
            else if (existingTemplate != null) {
                // use existing
                return _applicator(existingTemplate);
            }
            else {
                warn("No template or placeholder available", {
                    sourceId: sourceId,
                    key: key
                });
                return {
                    s: function (vars) {
                        warn("Rendering: no template or placeholder available", {
                            sourceId: sourceId,
                            key: key,
                            vars: vars
                        });
                        return "";
                    }
                };
            }
        }
    };
}
function _createDefaultModule(sourceId) {
    return {
        key: function (key, placeholder) {
            if (placeholder != null) {
                // use provided
                warn("No module (" + sourceId + "): key \"" + key + "\" is using placeholder \"" + placeholder + "\"");
                return _applicator(placeholder);
            }
            else {
                error("No module (" + sourceId + "): key \"" + key + "\" has no placeholder");
                return {
                    s: function (vars) {
                        error("Rendering: No module (" + sourceId + "): key \"" + key + "\" has no placeholder; see vars:", vars);
                        return "";
                    }
                };
            }
        }
    };
}
function _applicator(sample) {
    return { s: function (vars) { return _applyVars(sample, vars); } };
}
function _lookupTemplate(sourceId, key) {
    if (T[sourceId] == null) {
        error("Source has no definitions \"" + sourceId + "\"");
        return "";
    }
    if (T[sourceId][key] == null) {
        error("Source key not defined \"" + sourceId + "\": \"" + key + "\"");
        return "";
    }
    var trans = T[sourceId][key];
    var lang = fn.lang;
    var tmpl = trans[lang];
    if (tmpl) {
        return tmpl;
    }
    else {
        warn("Translation for lang not found", "lang: " + lang + " for: " + key);
        for (var _i = 0, _a = fn.langFallbacks; _i < _a.length; _i++) {
            var fallbackLang = _a[_i];
            var tmpl_1 = trans[fallbackLang];
            if (tmpl_1) {
                return tmpl_1;
            }
        }
        error("No translation found", "fallbacks: " + fn.langFallbacks + " for: " + key);
        return "";
    }
}
/**
 * @param {string} translation
 * @param {{[id: string]: string}} vars
 */
function _applyVars(translation, vars) {
    return translation.replace(/\$(\w+)\$/g, function (_, id) { return vars[id]; });
}
exports.whoa = fn;

