'use strict'

// /** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ConnectiqueMateriaux extends Model {

  static get createdAtColumn () {
    return null
  }
  static get updatedAtColumn () {
    return null
  }

  getId_materiaux (materiaux_id) {
    return id_materiaux.replace(materiaux_id)
  }

    materiauxes (id_materiaux) {
    return id_materiaux === materiaux_id
  }

  static NameId_materiaux(field, value) {
    if(field === 'materiaux_id') {
      return value.field('id_materiaux')
    }
    return super.NameId_materiaux(field, value)
  }

  connectiques () {
    return this.hasMany('App/Models/Connectique')
    //.pivotTable('connectique_materiauxes')
    .withPivot(['id_materiaux'])
  }

  connectique_materiaux () {
    return this.hasMany('App/Models/connectique_materiaux')
  }
}

module.exports = ConnectiqueMateriaux
