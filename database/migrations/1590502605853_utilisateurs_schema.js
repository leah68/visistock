'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UtilisateursSchema extends Schema {
  up () {
    this.create('utilisateurs', (table) => {
      table.increments()
      table.string('nom', 255).notNullable()
      table.string('prenom', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('utilisateurs')
  }
}

module.exports = UtilisateursSchema
