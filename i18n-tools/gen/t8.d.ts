// From "reportDashboard"
/**
 * *No variables*\
 * **Examples**:\
 * en: "Home";\
 * kr: ""; */
export declare function t8(key: "reportDashboard:topbar.home"): () => string
/**
 * *No variables*\
 * **Examples**:\
 * en: "Reports";\
 * kr: "akw"; */
export declare function t8(key: "reportDashboard:topbar.reports"): () => string
type T8sendOutToUsersnPeopleVars = {
  /** number of people */
  n: string,
};
/**
 * `n` number of people\
 * **Examples**:\
 * en: "$n people";\
 * kr: "$n people"; */
export declare function t8(key: "reportDashboard:sendOutToUsers.nPeople"): (vars: T8sendOutToUsersnPeopleVars) => string;

// From "navbar"
/**
 * *No variables*\
 * **Examples**:\
 * en: "Home";\
 * kr: ""; */
export declare function t8(key: "navbar:topbar.home"): () => string
/**
 * *No variables*\
 * **Examples**:\
 * en: "Reports";\
 * kr: "akw"; */
export declare function t8(key: "navbar:topbar.reports"): () => string

// From "onboarding"
type T8firstWelcomehelloUserAVars = {
  /** Example "Camilla" */
  firstName: string,
};
/**
 * `firstName` Example "Camilla"\
 * **Examples**:\
 * en: "Welcome to MaestroQA $firstName";\
 * kr: ""; */
export declare function t8(key: "onboarding:firstWelcome.helloUserA"): (vars: T8firstWelcomehelloUserAVars) => string;
type T8firstWelcomehelloUserBVars = {
  /** Example "Jane" */
  firstName: string,

  /** Example "Singh" */
  lastName: string,
};
/**
 * `firstName` Example "Jane"\
 * `lastName` Example "Singh"\
 * **Examples**:\
 * en: "Welcome to MaestroQA $firstName $lastName!";\
 * kr: ""; */
export declare function t8(key: "onboarding:firstWelcome.helloUserB"): (vars: T8firstWelcomehelloUserBVars) => string;
type T8secondWelcomehelloUserVars = {
  /** Example "Cole" */
  firstName: string,
};
/**
 * `firstName` Example "Cole"\
 * **Examples**:\
 * en: "Welcome to MaestroQA $firstName";\
 * kr: ""; */
export declare function t8(key: "onboarding:secondWelcome.helloUser"): (vars: T8secondWelcomehelloUserVars) => string;
