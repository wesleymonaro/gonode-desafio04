'use strict'
const Share = use('App/Models/Share')
const Event = use('App/Models/Event')
/**
 * Resourceful controller for interacting with shares
 */
class ShareController {
  /**
   * Show a list of all shares.
   * GET shares
   */
  async index ({ params }) {
    const shares = await Share.query()
      .where('event_id', params.events_id)
      .with('user')
      .fetch()

    return shares
  }

  /**
   * Create/save a new share.
   * POST shares
   */
  async store ({ request, response, params }) {
    const { user_id } = request.only(['user_id'])

    let event = await Event.findOrFail(params.events_id)

    let shares = await Share.query()
      .where('event_id', params.events_id)
      .fetch()

    shares = shares.toJSON()
    event = event.toJSON()

    if (event.user_id === parseInt(user_id)) {
      return response.status(400).send({
        message: `The user ${user_id} is the owner of the event '${
          event.title
        }'.`
      })
    }

    if (shares.find(s => s.user_id === parseInt(user_id))) {
      return response.status(400).send({
        message: `The event '${
          event.title
        }' is already shared to user ${user_id}.`
      })
    }

    await Share.create({ user_id, event_id: params.events_id })

    event = await Event.findOrFail(params.events_id)

    await event.load('user')
    await event.load('shares')

    return event
  }

  /**
   * Display a single share.
   * GET shares/:id
   */
  async show ({ params }) {
    const share = await Share.findOrFail(params.id)

    return share
  }

  /**
   * Update share details.
   * PUT or PATCH shares/:id
   */
  async update ({}) {}

  /**
   * Delete a share with id.
   * DELETE shares/:id
   */
  async destroy ({ params }) {
    const share = await Share.findOrFail(params.id)

    await share.delete()
  }
}

module.exports = ShareController
