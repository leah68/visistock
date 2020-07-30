'use strict'

//const CaracteristiqueValeur = require("~~/app/Models/caracteristique_valeur")

const Caracteristique = use('App/Models/Caracteristique')
const CaracteristiqueType = use('App/Models/Caracteristique_Type')

const Materiaux = use('App/Models/Materiaux')
const CaracteristiqueValeur = use('App/Models/Caracteristique_Valeur')

class CaracteristiqueController {
	async list ({ request, response }) {
    try {
      // Récupération de la liste des commandes
      const caracteristiques = await Caracteristique.all()
      return response.send({
        status: 'success',
        data: caracteristiques
      })
    } catch (error) {
      return response.status(500).send({
        status: 'error',
        code: error.code,
        message: 'Une erreur a été rencontrée lors du chargement des commandes : ' + error.message
      })
    }
  }

  async selectCaraEdit ({params, request, response }) {
    try {
      const id = params.id
      console.log(id)

      const caracteristiques = await Caracteristique.query()
        .select('id')
        .from('caracteristiques')
        .innerJoin('caracteristique_types', 'caracteristiques.id', 'caracteristique_types.id_caracteristique')
        .where('id_type', params.id)
        .fetch()

      return response.send({
        status: 'success',
        data: caracteristiques
      })
    } catch (error) {
      return response.status(500).send({
        status: 'error',
        code: error.code,
        message: 'Une erreur a été rencontrée lors du chargement des commandes : ' + error.message
      })
    }
  }

  async selectOne ({ params, request, response }) {
    try {
      // Récupération de la liste des commandes
      /*const caracteristiques = await Caracteristique.query()
        .select('caracteristique_valeurs.id as id_carval', 'caracteristiques.id', 'caracteristiques.nom', 'caracteristique_valeurs.texte')
        .from('caracteristiques')
        .innerJoin('caracteristique_types', 'caracteristiques.id', 'caracteristique_types.id_caracteristique')
        .innerJoin('materiauxes', 'caracteristique_types.id_type', 'materiauxes.id_type')
        .leftJoin('caracteristique_valeurs', 'materiauxes.id', 'caracteristique_valeurs.id_materiaux')
        .where('materiauxes.id', params.id)*/

        /*const caracteristiques = await Caracteristique.query()
        .select('caracteristiques.id', 'caracteristiques.nom')
        .from('caracteristiques')
        .innerJoin('caracteristique_types', 'caracteristiques.id', 'caracteristiques_types.id_caracteristique')
        .innerJoin('materiauxes', 'caracteristique_types.id_type', 'materiauxes.id_type')
        .where('materiauxes.id', params.id)*/
        const materiauxes = await Materiaux.query()
          .select('materiauxes.id', 'materiauxes.nom', 'materiauxes.id_type')
          .from('materiauxes')
          .where('materiauxes.id', params.id)

        const caracteristiques = await Caracteristique.query()
          .select('caracteristiques.id as id_cara', 'caracteristiques.nom')
          .from('caracteristiques')
          .innerJoin('caracteristique_types', 'caracteristiques.id', 'caracteristique_types.id_caracteristique')
          .innerJoin('materiauxes', 'caracteristique_types.id_type', 'materiauxes.id_type')
          .where('materiauxes.id', params.id)

        const caracteristique_valeurs = await CaracteristiqueValeur.query()
          .select('caracteristique_valeurs.id', 'caracteristique_valeurs.texte', 'caracteristique_valeurs.id_caracteristique')
          .from('caracteristique_valeurs')
          .where('id_materiaux', params.id)

        console.log(caracteristique_valeurs)
         const caracteristiques_full = []
          for (let i in caracteristiques) {
            let caracteristique = caracteristiques[i]
            console.log(i)
            let valeur = caracteristique_valeurs.find(obj => obj.id_caracteristique === caracteristique.id_cara)
            console.log(valeur)
            if(typeof valeur === 'undefined' || valeur.id == null){
            caracteristiques_full.push({
              'id_caracteristique': caracteristique.id_cara,
              'nom': caracteristique.nom,
            })
          } else {
            caracteristiques_full.push({
              'id_caracteristique': caracteristique.id_cara,
              'nom': caracteristique.nom,
              'id_carval': valeur.id,
              'texte': valeur.texte
            })
          }
        }

      return response.send({
        status: 'success',
        data: caracteristiques_full
      })
    } catch (error) {
      return response.status(500).send({
        status: 'error',
        code: error.code,
        message: 'Une erreur a été rencontrée lors du chargement des commandes : ' + error.message
      })
    }
  }

  
  async insert ({ request, response}) {
    try {
      console.log(request.post())
      // Récupération de la liste des commandes
        const data = request.post()
        const caracteristiques = new Caracteristique()
        caracteristiques.nom = data.nom
        await caracteristiques.save()

      return response.send({
        status: 'success',
        data: caracteristiques
      })
    } catch (error) {
      return response.status(500).send({
        status: 'error',
        code: error.code,
        message: 'Une erreur a été rencontrée lors du chargement des commandes : ' + error.message
      })
    }
  }

  async delete ({ params, response}) {
    try {
      console.log(params)
      const caracteristiques = await Caracteristique.query()
        .table('caracteristiques')
        .where('id', params.id)
        .delete()

      return response.send({
        status: 'success',
        data: caracteristiques
      })
    } catch (error) {
      return response.status(500).send({
        status: 'error',
        code: error.code,
        message: 'Une erreur a été rencontrée lors du chargement des commandes : ' + error.message
      })
    }
  }

  async update ({ params, request, response}) {
    try {
      const id = params.id
      const data = request.post()
      console.log('params', id)
      console.log('data', data)

      const caracteristiques = await Caracteristique.query()
        .table('caracteristiques')
        .where('id', params.id)
        .update({
          'nom': data.nom
        })
        //.innerJoin('caracteristique_types', 'caracteristiques.id', 'caracteristique_types.id_type')

      /*const caracteristique_types = await CaracteristiqueType.query()
        .table('caracteristiques')
        .innerJoin('caracteristique_types', 'caracteristiques.id', 'caracteristique_types.id_type')*/

      return response.send({
        status: 'success',
        data: caracteristiques
      })
    } catch (error) {
      return response.status(500).send({
        status: 'error',
        code: error.code,
        message: 'Une erreur a été rencontrée lors du chargement des commandes : ' + error.message
      })
    }
  }
}


module.exports = CaracteristiqueController
