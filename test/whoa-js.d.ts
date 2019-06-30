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


export declare const whoa: whoaExport;
