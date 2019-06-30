import { whoa } from './whoa-ts'

const log = console.log.bind(console)

log(whoa("reportDashboard").key("sendOutToUsers.nPeople").s({ n: "1" }))
log(whoa("onboarding").key("firstWelcome.helloUserB").s({ firstName: "Cole", lastName: "Lawrence" }))
log(whoa("navbar").key("topbar.reports").s())

whoa.lang = 'es'

log(whoa("reportDashboard").key("sendOutToUsers.nPeople").s({ n: "1" }))
log(whoa("onboarding").key("firstWelcome.helloUserB").s({ firstName: "Cole", lastName: "Lawrence" }))
log(whoa("navbar").key("topbar.reports").s())

const navbar = whoa("navbar")

log(navbar.key("topbar.reports").s())

const fruits = whoa("favoriteFruits")

log(fruits.key("orange.one").s())
log(fruits.key("orange.other").s({ n: '12' }))

const veggies = whoa("veggies")

log([
  veggies.key("carrot.one", "Carrot").s(),
  veggies.key("carrot.two", "Two Carrots").s(),
  veggies.key("carrot.three", "Three Carrots").s(),
  veggies.key("carrot.other", "$n$ Carrots").s({ n: 12 })
])
