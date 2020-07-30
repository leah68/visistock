'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConnectiqueMateriauxSchema extends Schema {
  up () {
    this.create('connectique_materiauxes', (table) => {
      table.integer('id_connectique').unsigned().index('id_connectique')
      table.integer('id_materiaux').unsigned().index('id_materiaux')
      table.foreign('id_connectique').references('id').inTable('connectiques')
      table.foreign('id_materiaux').references('id').inTable('materiauxes')

      /* table.primary(['id', 'connectique_id', 'materiaux_id'])
      table.integer('language_id').notNullable().unsigned()
      table.integer('user_id').notNullable().unsigned() */
    })
  }

  down () {
    this.drop('connectique_materiauxes')
  }
}

module.exports = ConnectiqueMateriauxSchema