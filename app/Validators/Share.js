'use strict'

class Share {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      // title: 'required',
      // locale: 'required',
      // date: 'required|date',
      // hour: 'required|time'
    }
  }
}

module.exports = Share
