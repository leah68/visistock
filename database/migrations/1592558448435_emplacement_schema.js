'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmplacementSchema extends Schema {
  up () {
    this.create('emplacements', (table) => {
      table.increments()
      table.string('nom', 255);
      table.timestamps()
    })
  }

  down () {
    this.drop('emplacements')
  }
}

module.exports = EmplacementSchema
