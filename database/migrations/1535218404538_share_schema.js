'use strict'

const Schema = use('Schema')

class ShareSchema extends Schema {
  up () {
    this.create('shares', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('event_id')
        .unsigned()
        .references('id')
        .inTable('events')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('shares')
  }
}

module.exports = ShareSchema
