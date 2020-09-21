'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CaracteristiqueType extends Model {
  /*caracteristique () {
    return this.hasOne('App/Models/Caracteristique')
  }

  type () {
    return this.hasOne('App/Models/Type')
  }*/
  static get createdAtColumn () {
    return null
  }
  static get updatedAtColumn () {
    return null
  }

  caracteristiques () {
    return this.hasMany('App/Models/Caracteristique')
  }

  /*
  types () {
    return this.belongsTo('App/Models/Type', 'id_type')
  }*/
}

module.exports = CaracteristiqueType
