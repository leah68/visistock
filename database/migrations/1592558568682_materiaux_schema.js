'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MateriauxSchema extends Schema {
  up () {
    this.create('materiauxes', (table) => {
      table.increments()
      table.string('nom', 255);
      table.integer('id_materiel_liaison').unsigned().references('id').inTable('materiauxes')
      table.integer('id_utilisateur').unsigned().references('id').inTable('utilisateurs')
      table.integer('id_type').unsigned().references('id').inTable('types')
      table.integer('id_emplacement').unsigned().references('id').inTable('emplacements')
      table.timestamps()
    })
  }

  down () {
    this.drop('materiauxes')
  }
}

module.exports = MateriauxSchema