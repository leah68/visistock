'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Connectique extends Model {
  /*
  connectique_materiauxes () {
    return this.hasMany('App/Models/ConnectiqueMateriaux')
  } */

  /* materiaux () {
    return this.belongsToMany('App/Models/Materiaux').pivotTable('connectique_materiaux')
  } */

  /* materiauxes () {
    return this
      .belongsToMany('App/Models/Materiaux')
      .pivotModel('App/Models/ConnectiqueMateriaux')
      .pivotTable('connectique_materiauxes');
  } */

  // connectique_materiaux () {
  //   return this.hasMany('App/Models/ConnectiqueMateriaux', 'connectique_materiauxes')
  //   //.withPivot(['id_materiaux'])
  // }

  materiauxes () {
    return this.belongsToMany('App/Models/Materiaux').pivotTable('connectique_materiauxes', 'materiauxes')
  }
}

module.exports = Connectique
