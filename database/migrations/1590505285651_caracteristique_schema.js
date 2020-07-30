'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CaracteristiqueSchema extends Schema {
  up () {
    this.create('caracteristiques', (table) => {
      table.increments()
      table.string('nom', 255)
      table.timestamps()
    })
  }

  down () {
    this.drop('caracteristiques')
  }
}

module.exports = CaracteristiqueSchema
