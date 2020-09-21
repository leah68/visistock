'use strict'

const Model = use('Model')

class CaracteristiqueValeur extends Model {
  caracteristiques	() {
    return this.hasMany('App/Models/Caracteristique')
  }
}

module.exports = CaracteristiqueValeur
