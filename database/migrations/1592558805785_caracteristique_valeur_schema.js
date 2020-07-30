'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CaracteristiqueValeurSchema extends Schema {
  up () {
    this.create('caracteristique_valeurs', (table) => {
      table.increments()
      table.text('texte')
      table.integer('id_caracteristique').unsigned().index('id_caracteristique')
      table.integer('id_materiaux').unsigned().index('id_materiaux')
      table.foreign('id_caracteristique').references('id').inTable('caracteristiques')
      table.foreign('id_materiaux').references('id').inTable('materiauxes')
      table.timestamps()
    })
  }

  down () {
    this.drop('caracteristique_valeurs')
  }
}

module.exports = CaracteristiqueValeurSchema
