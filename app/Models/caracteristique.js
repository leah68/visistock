'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Caracteristique extends Model {
  caracteristique_type () {
    return this.hasMany('App/Models/CaracteristiqueType', 'caracteristique_types')
  }

  types () {
    return this.belongsToMany('App/Models/Type').pivotTable('caracteristique_types', 'types')
  }

  caracteristique_valeur () {
    return this.hasMany('App/Models/Caracteristique_Valeur', 'caracteristique_valeurs')
  }

  materiauxes () {
    return this.belongsToMany('App/Models/Materiaux').pivotTable('caracteristique_valeurs', 'materiauxes')
  }
}

module.exports = Caracteristique
