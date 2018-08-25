'use strict'

const Route = use('Route')

Route.post('/users', 'UserController.store').validator('User')
Route.post('/sessions', 'SessionController.store').validator('Session')

Route.group(() => {
  Route.resource('/events', 'EventController')
    .apiOnly()
    .validator(new Map([[['events.store'], ['Event']]]))

  Route.resource('/events.shares', 'ShareController')
    .apiOnly()
    .validator(new Map([[['events.share.store'], ['Share']]]))
}).middleware(['auth'])

Route.get('/', ({ request }) => {
  return { greeting: 'Welcome to GoNode Desafio04 API!' }
})
