'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CaracteristiqueTypeSchema extends Schema {
  up () {
    this.create('caracteristique_types', (table) => {
      table.integer('id_type').unsigned().index('id_type')
      table.integer('id_caracteristique').unsigned().index('id_caracteristique')
      table.foreign('id_type').references('id').inTable('types')
      table.foreign('id_caracteristique').references('id').inTable('caracteristiques')
    })
  }

  down () {
    this.drop('caracteristique_types')
  }
}

module.exports = CaracteristiqueTypeSchema
