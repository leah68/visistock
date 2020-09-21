'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Materiaux extends Model {

  connectique_materiaux () {
    return this.hasMany('App/Models/connectique_materiaux')
  }

  utilisateur () {
    return this.hasMany('App/Models/Utilisateur')
  }

  type () {
    return this.hasMany('App/Models/Type')
  }

  valeur_caracteristique () {
    return this.hasMany('App/Models/CaracteristiqueValeur')
  }

  /* id_matériel_liaison ???????????? */
  materiaux () {
    return this.hasMany('App/Models/Materiaux')
  }

  /*connectiques () {
    return this.belongsTo('App/Models/Connectique')
  }*/

  caracteristiques () {
    return this.hasMany('App/Models/Caracteristique_Valeur')
  }

  connectiques () {
    return this.hasMany('App/Models/Connectique')
      .pivotTable('connectique_materiauxes')
      .withPivot(['id_materiaux'])
  }
  
  /*
  connectique_materiaux(){
    return this.belongsTo('App/Models/ConnectiqueMateriaux')
  } */
}

module.exports = Materiaux

/*

const Model = use('Model')

class Connectique extends Model {
  materiauxes () {
    return this
      .ManyToMany('App/Models/Materiaux')
      .pivotModel('App/Models/ConnectiqueMateriaux')
  }
}

module.exports = Connectique
*/
