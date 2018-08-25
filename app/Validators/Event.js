'use strict'

class Event {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      title: 'required',
      locale: 'required',
      date: 'required|date',
      hour: 'required|time'
    }
  }
}

module.exports = Event
