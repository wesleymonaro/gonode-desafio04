'use strict'

const Model = use('Model')

class Event extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  shares () {
    return this.hasMany('App/Models/Share')
  }
}

module.exports = Event
