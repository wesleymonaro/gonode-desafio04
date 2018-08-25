'use strict'

const Model = use('Model')

class Share extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  event () {
    return this.belongsTo('App/Models/Event')
  }
}

module.exports = Share
