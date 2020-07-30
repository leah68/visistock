'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConnectiqueSchema extends Schema {
  up () {
    this.create('connectiques', (table) => {
      table.increments()
      table.string('type', 255)
      table.timestamps()
    })
  }

  down () {
    this.drop('connectiques')
  }
}

module.exports = ConnectiqueSchema
