import { t8 } from '../gen/t8'
import * as t8m from '../gen/t8'

console.log(t8("reportDashboard:sendOutToUsers.nPeople")({ n: "1" }))
console.log(t8("onboarding:firstWelcome.helloUserB")({ firstName: "Cole", lastName: "Lawrence" }))
console.log(t8("navbar:topbar.reports")())

;(<any>t8m).lang = 'kr'

console.log(t8("reportDashboard:sendOutToUsers.nPeople")({ n: "1" }))
console.log(t8("onboarding:firstWelcome.helloUserB")({ firstName: "Cole", lastName: "Lawrence" }))
console.log(t8("navbar:topbar.reports")())

