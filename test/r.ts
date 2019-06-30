import { t8 } from '../gen/t8'
import * as t8m from '../gen/t8'

const log = console.log.bind(console, 'r.ts')

// log(t8("reportDashboard").key("sendOutToUsers.nPeople").s({ n: "1" }))
// log(t8("onboarding").key("firstWelcome.helloUserB").s({ firstName: "Cole", lastName: "Lawrence" }))
// log(t8("navbar").key("topbar.reports").s())

;(<any>t8m).lang = 'es'

// log(t8("reportDashboard").key("sendOutToUsers.nPeople").s({ n: "1" }))
// log(t8("onboarding").key("firstWelcome.helloUserB").s({ firstName: "Cole", lastName: "Lawrence" }))
// log(t8("navbar").key("topbar.reports").s())

// const navbar = t8("navbar")

// navbar.key("topbar.reports").s()

const fruits = t8("favoriteFruits")

log(fruits.key("orange.one").s())
log(fruits.key("orange.other").s({ n: '12' }))

const veggies = t8("veggies")

log([
  veggies.key("carrot.one", "Carrot").s(),
  veggies.key("carrot.two", "Two Carrots").s(),
  veggies.key("carrot.three", "Three Carrots").s(),
  veggies.key("carrot.other", "$n$ Carrots").s({ n: 12 })
])
