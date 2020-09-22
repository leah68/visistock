'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Type extends Model {
  //caracteristique_type () {
    //return this.hasMany('App/Models/CaracteristiqueType')
  //}
  caracteristique_type () {
    return this.hasMany('App/Models/caracteristique_type')
  }

  caracteristiques () {
    return this.hasMany('App/Models/caracteristique')
  }

  /*
  caracteristiques () {
    return this.belongsToMany('App/Models/Caracteristique').pivotTable('caracteristique_types').withPivot(['id_type'])
  }*/

  /*caracteristiques_types(){
    return this.belongsTo('App/Models/Caracteristique', 'caracteristique_types')
  }

  caracteristique() {
    return this.manyThrough('App/Models/Caracteristique', 'caracteristique_types')
  }*/
}

module.exports = Type
