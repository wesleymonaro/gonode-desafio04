'use strict'
const Event = use('App/Models/Event')
/**
 * Resourceful controller for interacting with events
 */
class EventController {
  /**
   * Show a list of all events.
   * GET events
   */
  async index ({ request }) {
    const { page } = request.get()

    const events = await Event.query()
      .with('user')
      .with('shares')
      .paginate(page)

    return events
  }

  /**
   * Create/save a new events.
   * POST events
   */
  async store ({ request, auth }) {
    const data = request.all()

    const event = await Event.create({ ...data, user_id: auth.user.id })

    return event
  }

  /**
   * Display a single event.
   * GET events/:id
   */
  async show ({ params }) {
    const event = await Event.findOrFail(params.id)

    await event.load('user')
    await event.load('shares')

    return event
  }

  /**
   * Update event details.
   * PUT or PATCH events/:id
   */
  async update ({ params, request }) {
    const event = await Event.findOrFail(params.id)
    const data = request.DOMRectReadOnly(['title', 'local', 'date', 'hour'])

    event.merge(data)

    await event.save()

    return event
  }

  /**
   * Delete a event with id.
   * DELETE events/:id
   */
  async destroy ({ params, auth, response }) {
    const event = await Event.findOrFail(params.id)

    const eventJSON = event.toJSON()

    if (eventJSON.user_id !== auth.user.id) {
      return response
        .status(401)
        .send({ message: 'You not have permissions to delete the event' })
    }

    await event.delete()
  }
}

module.exports = EventController
