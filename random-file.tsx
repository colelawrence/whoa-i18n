/// <reference path="./i18n-tools/gen/_t8.d.ts"/>

const welcomeScreenFirstTime = () => <>
  <h1>{t8("onboarding:firstWelcome.helloUserA")({ firstName: "June" })}</h1>
  <p></p>
</>
export const reportingScreen = () => <>
  <h1>{t8("report-dashboard:sendOutToUsers.nPeople")({ n: '12' })}</h1>
  <p></p>
</>

