const T: T = {
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
} as T;

export type Lang = "en" | "es";

export type Translation = {
  /** Variables used in template interpolation */
  vars?: {
    /** id to notes about usage */
    [id: string]: string;
  };
} & {
  /** Template for language */
  [lang in Lang]?: string;
};

type T = {
  [sourceId: string]: {
    [key: string]: Translation;
  };
};

interface whoaExport {
  langFallbacks: Lang[];
  lang: Lang;
}

//#region source-favoriteFruits

interface whoaExport {
  /** Source: `test/components/favoriteFruits.i18n` */
  (sourceId: "favoriteFruits"): favoriteFruitsTM;
}

export interface favoriteFruitsTM {
  /**
   * ## ordinaryFruitNames.banana
   * `Banana`\
   * *No variables*\
   * **Examples**:\
   * en: "Banana"\
   * es: "Plátano"\
   */
  key(
    key: "ordinaryFruitNames.banana"
  ): {
    /**
     * ## ordinaryFruitNames.banana
     * `Banana`\
     * *No variables*\
     * **Examples**:\
     * en: "Banana"\
     * es: "Plátano"\
     */
    s: () => string;
  };

  /** @deprecated Please remove placeholder to use i18n translations */
  key(
    key: "ordinaryFruitNames.banana",
    placeholder: string
  ): {
    /** @deprecated Please remove placeholder to use i18n translations */
    s: (vars?: any) => string;
  };

  /**
   * ## ordinaryFruitNames.tomato
   * `Tomato`\
   * *No variables*\
   * **Examples**:\
   * en: "Tomato"\
   * es: "Tomate"\
   */
  key(
    key: "ordinaryFruitNames.tomato"
  ): {
    /**
     * ## ordinaryFruitNames.tomato
     * `Tomato`\
     * *No variables*\
     * **Examples**:\
     * en: "Tomato"\
     * es: "Tomate"\
     */
    s: () => string;
  };

  /** @deprecated Please remove placeholder to use i18n translations */
  key(
    key: "ordinaryFruitNames.tomato",
    placeholder: string
  ): {
    /** @deprecated Please remove placeholder to use i18n translations */
    s: (vars?: any) => string;
  };

  /**
   * ## ordinaryFruitNames.apple
   * `Apple`\
   * *No variables*\
   * **Examples**:\
   * en: "Apple"\
   * es: "Manzana"\
   */
  key(
    key: "ordinaryFruitNames.apple"
  ): {
    /**
     * ## ordinaryFruitNames.apple
     * `Apple`\
     * *No variables*\
     * **Examples**:\
     * en: "Apple"\
     * es: "Manzana"\
     */
    s: () => string;
  };

  /** @deprecated Please remove placeholder to use i18n translations */
  key(
    key: "ordinaryFruitNames.apple",
    placeholder: string
  ): {
    /** @deprecated Please remove placeholder to use i18n translations */
    s: (vars?: any) => string;
  };

  /**
   * ## orange.one
   * `Orange`\
   * *No variables*\
   * **Examples**:\
   * en: "Orange"\
   * es: "Naranja"\
   */
  key(
    key: "orange.one"
  ): {
    /**
     * ## orange.one
     * `Orange`\
     * *No variables*\
     * **Examples**:\
     * en: "Orange"\
     * es: "Naranja"\
     */
    s: () => string;
  };

  /** @deprecated Please remove placeholder to use i18n translations */
  key(
    key: "orange.one",
    placeholder: string
  ): {
    /** @deprecated Please remove placeholder to use i18n translations */
    s: (vars?: any) => string;
  };

  /**
   * ## orange.two
   * `Two Oranges`\
   * *No variables*\
   * **Examples**:\
   * en: "Two Oranges"\
   * es: "Dos Naranjas"\
   */
  key(
    key: "orange.two"
  ): {
    /**
     * ## orange.two
     * `Two Oranges`\
     * *No variables*\
     * **Examples**:\
     * en: "Two Oranges"\
     * es: "Dos Naranjas"\
     */
    s: () => string;
  };

  /** @deprecated Please remove placeholder to use i18n translations */
  key(
    key: "orange.two",
    placeholder: string
  ): {
    /** @deprecated Please remove placeholder to use i18n translations */
    s: (vars?: any) => string;
  };

  /**
   * ## orange.three
   * `Three Oranges`\
   * *No variables*\
   * **Examples**:\
   * en: "Three Oranges"\
   * es: "Tres Naranjas"\
   */
  key(
    key: "orange.three"
  ): {
    /**
     * ## orange.three
     * `Three Oranges`\
     * *No variables*\
     * **Examples**:\
     * en: "Three Oranges"\
     * es: "Tres Naranjas"\
     */
    s: () => string;
  };

  /** @deprecated Please remove placeholder to use i18n translations */
  key(
    key: "orange.three",
    placeholder: string
  ): {
    /** @deprecated Please remove placeholder to use i18n translations */
    s: (vars?: any) => string;
  };

  /**
   * ## orange.other
   * `$n$ Oranges`\
   * `n` number of\
   * **Examples**:\
   * en: "$n$ Oranges"\
   * es: "$n$ Naranjas"\
   */
  key(
    key: "orange.other"
  ): {
    /**
     * ## orange.other
     * `$n$ Oranges`\
     * `n` number of\
     * **Examples**:\
     * en: "$n$ Oranges"\
     * es: "$n$ Naranjas"\
     */
    s: (vars: TmplfavoriteFruitsorangeotherVars) => string;
  };

  /** @deprecated Please remove placeholder to use i18n translations */
  key(
    key: "orange.other",
    placeholder: string
  ): {
    /** @deprecated Please remove placeholder to use i18n translations */
    s: (vars?: any) => string;
  };

  /**
   * ## Default
   * Behaves the same way as looking up the key, if it's not found we use the provided placeholder and can log a warning
   */
  key(
    key: string,
    placeholder: string
  ): {
    /** ## Default */
    s: (vars?: any) => string;
  };
}
//#endregion source-favoriteFruits
//#region source-favoriteFruits-types

type TmplfavoriteFruitsorangeotherVars = {
  /** number of */
  n: string;
};

//#endregion source-favoriteFruits-types

//#region source-navbar

interface whoaExport {
  /** Source: `test/components/navbar.i18n` */
  (sourceId: "navbar"): navbarTM;
}

export interface navbarTM {
  /**
   * ## topbar.home
   * `Home`\
   * *No variables*\
   * **Examples**:\
   * en: "Home"\
   * es: ""\
   */
  key(
    key: "topbar.home"
  ): {
    /**
     * ## topbar.home
     * `Home`\
     * *No variables*\
     * **Examples**:\
     * en: "Home"\
     * es: ""\
     */
    s: () => string;
  };

  /** @deprecated Please remove placeholder to use i18n translations */
  key(
    key: "topbar.home",
    placeholder: string
  ): {
    /** @deprecated Please remove placeholder to use i18n translations */
    s: (vars?: any) => string;
  };

  /**
   * ## topbar.reports
   * `Reports`\
   * *No variables*\
   * **Examples**:\
   * en: "Reports"\
   * es: ""\
   */
  key(
    key: "topbar.reports"
  ): {
    /**
     * ## topbar.reports
     * `Reports`\
     * *No variables*\
     * **Examples**:\
     * en: "Reports"\
     * es: ""\
     */
    s: () => string;
  };

  /** @deprecated Please remove placeholder to use i18n translations */
  key(
    key: "topbar.reports",
    placeholder: string
  ): {
    /** @deprecated Please remove placeholder to use i18n translations */
    s: (vars?: any) => string;
  };

  /**
   * ## Default
   * Behaves the same way as looking up the key, if it's not found we use the provided placeholder and can log a warning
   */
  key(
    key: string,
    placeholder: string
  ): {
    /** ## Default */
    s: (vars?: any) => string;
  };
}
//#endregion source-navbar
//#region source-navbar-types

//#endregion source-navbar-types

//#region source-reportDashboard

interface whoaExport {
  /** Source: `test/components/reportDashboard.i18n` */
  (sourceId: "reportDashboard"): reportDashboardTM;
}

export interface reportDashboardTM {
  /**
   * ## topbar.home
   * `Home`\
   * *No variables*\
   * **Examples**:\
   * en: "Home"\
   * es: ""\
   */
  key(
    key: "topbar.home"
  ): {
    /**
     * ## topbar.home
     * `Home`\
     * *No variables*\
     * **Examples**:\
     * en: "Home"\
     * es: ""\
     */
    s: () => string;
  };

  /** @deprecated Please remove placeholder to use i18n translations */
  key(
    key: "topbar.home",
    placeholder: string
  ): {
    /** @deprecated Please remove placeholder to use i18n translations */
    s: (vars?: any) => string;
  };

  /**
   * ## topbar.reports
   * `Reports`\
   * *No variables*\
   * **Examples**:\
   * en: "Reports"\
   * es: ""\
   */
  key(
    key: "topbar.reports"
  ): {
    /**
     * ## topbar.reports
     * `Reports`\
     * *No variables*\
     * **Examples**:\
     * en: "Reports"\
     * es: ""\
     */
    s: () => string;
  };

  /** @deprecated Please remove placeholder to use i18n translations */
  key(
    key: "topbar.reports",
    placeholder: string
  ): {
    /** @deprecated Please remove placeholder to use i18n translations */
    s: (vars?: any) => string;
  };

  /**
   * ## sendOutToUsers.nPeople
   * `$n people`\
   * `n` number of people\
   * **Examples**:\
   * en: "$n people"\
   * es: ""\
   */
  key(
    key: "sendOutToUsers.nPeople"
  ): {
    /**
     * ## sendOutToUsers.nPeople
     * `$n people`\
     * `n` number of people\
     * **Examples**:\
     * en: "$n people"\
     * es: ""\
     */
    s: (vars: TmplreportDashboardsendOutToUsersnPeopleVars) => string;
  };

  /** @deprecated Please remove placeholder to use i18n translations */
  key(
    key: "sendOutToUsers.nPeople",
    placeholder: string
  ): {
    /** @deprecated Please remove placeholder to use i18n translations */
    s: (vars?: any) => string;
  };

  /**
   * ## Default
   * Behaves the same way as looking up the key, if it's not found we use the provided placeholder and can log a warning
   */
  key(
    key: string,
    placeholder: string
  ): {
    /** ## Default */
    s: (vars?: any) => string;
  };
}
//#endregion source-reportDashboard
//#region source-reportDashboard-types

type TmplreportDashboardsendOutToUsersnPeopleVars = {
  /** number of people */
  n: string;
};

//#endregion source-reportDashboard-types

//#region source-onboarding

interface whoaExport {
  /** Source: `test/components/onboarding.i18n` */
  (sourceId: "onboarding"): onboardingTM;
}

export interface onboardingTM {
  /**
   * ## firstWelcome.helloUserA
   * `Welcome to MaestroQA $firstName`\
   * `firstName` Example "Camilla"\
   * **Examples**:\
   * en: "Welcome to MaestroQA $firstName"\
   * es: ""\
   */
  key(
    key: "firstWelcome.helloUserA"
  ): {
    /**
     * ## firstWelcome.helloUserA
     * `Welcome to MaestroQA $firstName`\
     * `firstName` Example "Camilla"\
     * **Examples**:\
     * en: "Welcome to MaestroQA $firstName"\
     * es: ""\
     */
    s: (vars: TmplonboardingfirstWelcomehelloUserAVars) => string;
  };

  /** @deprecated Please remove placeholder to use i18n translations */
  key(
    key: "firstWelcome.helloUserA",
    placeholder: string
  ): {
    /** @deprecated Please remove placeholder to use i18n translations */
    s: (vars?: any) => string;
  };

  /**
   * ## firstWelcome.helloUserB
   * `Welcome to MaestroQA $firstName $lastName!`\
   * `firstName` Example "Jane"\
   * `lastName` Example "Singh"\
   * **Examples**:\
   * en: "Welcome to MaestroQA $firstName $lastName!"\
   * es: ""\
   */
  key(
    key: "firstWelcome.helloUserB"
  ): {
    /**
     * ## firstWelcome.helloUserB
     * `Welcome to MaestroQA $firstName $lastName!`\
     * `firstName` Example "Jane"\
     * `lastName` Example "Singh"\
     * **Examples**:\
     * en: "Welcome to MaestroQA $firstName $lastName!"\
     * es: ""\
     */
    s: (vars: TmplonboardingfirstWelcomehelloUserBVars) => string;
  };

  /** @deprecated Please remove placeholder to use i18n translations */
  key(
    key: "firstWelcome.helloUserB",
    placeholder: string
  ): {
    /** @deprecated Please remove placeholder to use i18n translations */
    s: (vars?: any) => string;
  };

  /**
   * ## secondWelcome.helloUser
   * `Welcome to MaestroQA $firstName`\
   * `firstName` Example "Cole"\
   * **Examples**:\
   * en: "Welcome to MaestroQA $firstName"\
   * es: ""\
   */
  key(
    key: "secondWelcome.helloUser"
  ): {
    /**
     * ## secondWelcome.helloUser
     * `Welcome to MaestroQA $firstName`\
     * `firstName` Example "Cole"\
     * **Examples**:\
     * en: "Welcome to MaestroQA $firstName"\
     * es: ""\
     */
    s: (vars: TmplonboardingsecondWelcomehelloUserVars) => string;
  };

  /** @deprecated Please remove placeholder to use i18n translations */
  key(
    key: "secondWelcome.helloUser",
    placeholder: string
  ): {
    /** @deprecated Please remove placeholder to use i18n translations */
    s: (vars?: any) => string;
  };

  /**
   * ## Default
   * Behaves the same way as looking up the key, if it's not found we use the provided placeholder and can log a warning
   */
  key(
    key: string,
    placeholder: string
  ): {
    /** ## Default */
    s: (vars?: any) => string;
  };
}
//#endregion source-onboarding
//#region source-onboarding-types

type TmplonboardingfirstWelcomehelloUserAVars = {
  /** Example "Camilla" */
  firstName: string;
};
type TmplonboardingfirstWelcomehelloUserBVars = {
  /** Example "Jane" */
  firstName: string;

  /** Example "Singh" */
  lastName: string;
};
type TmplonboardingsecondWelcomehelloUserVars = {
  /** Example "Cole" */
  firstName: string;
};

//#endregion source-onboarding-types

interface whoaExport {
  /** This source does not yet exist */
  (sourceId: string): {
    /**
     * ## Default
     * Behaves the same way as looking up the key, if it's not found we use the provided placeholder and can log a warning
     */
    key(
      key: string,
      placeholder: string
    ): {
      /** ## Default */
      s: (vars?: any) => string;
    };
  };
}



const warn = console.warn.bind(console, "whoa warn");
const error = console.error.bind(console, "whoa err");


const fn = function whoa(sourceId: string) {
  if (T[sourceId] == null) {
    // create unknown module
    return _createDefaultModule(sourceId);
  } else {
    // sourceId is present
    return _createExistingModule(sourceId);
  }
} as whoaExport;

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


export const whoa = fn as whoaExport;
