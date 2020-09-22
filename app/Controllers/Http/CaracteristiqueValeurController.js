'use strict'

const TypeSchema = require("~~/database/migrations/1590505350898_type_schema")

const CaracteristiqueValeur = use('App/Models/caracteristique_valeur')
const Materiaux = use('App/Models/materiaux')

class CaracteristiqueValeurController {
	async list ({ request, response }) {
    try {
      // Récupération de la liste des commandes
      const caracteristique_valeurs = await CaracteristiqueValeur.query()
        .select('caracteristique_valeurs.id', 'texte', 'materiauxes.nom', 'types.nom as type')
        .from('caracteristique_valeurs')
        .leftJoin('materiauxes', 'caracteristique_valeurs.id_materiaux', 'materiauxes.id')
        .leftJoin('caracteristique_types', 'caracteristique_valeurs.id_caracteristique', 'caracteristique_types.id_caracteristique')
        .leftJoin('types', 'caracteristique_types.id_type', 'types.id')

      return response.send({
        status: 'success',
        data: caracteristique_valeurs
      })
    } catch (error) {
      return response.status(500).send({
        status: 'error',
        code: error.code,
        message: 'Une erreur a été rencontrée lors du chargement des commandes : ' + error.message
      })
    }
  }

  async selectEdit ({params, request, response }) {
    try {
      // const id = params.id
      // console.log(id)

      // const caracteristique_valeurs= await CaracteristiqueValeur.query()
        // .select('*')
        // .from('caracteristique_valeurs')
        // .where('id_materiaux', params.id)
        // .innerJoin('materiauxes', 'caracteristique_valeurs.id_materiaux', 'materiauxes.id')
        // .innerJoin('caracteristique_types', 'materiauxes.id_type', 'caracteristique_types.id_type')

        // .select('caracteristique_valeurs.id', 'caracteristique_valeurs.texte')
        // .from('materiauxes')
        // .innerJoin('types', 'materiauxes.id_type', 'types.id')
        // .where('materiauxes.id', 'materiauxes.id_type')
        // .innerJoin('caracteristique_valeurs', 'materiauxes.id', 'caracteristique_valeurs.id_materiaux')
        // .where('materiauxes.id', params.id)
        // .first()

        const id = params.id
        console.log(id)
  
        const materiauxes = await Materiaux.query()
          .select('materiauxes.id', 'materiauxes.nom as matnom', 'types.nom as type')
          .from('materiauxes')
          .innerJoin('types', 'materiauxes.id_type', 'types.id')
          .where('materiauxes.id', params.id)
          .first()

      return response.send({
        status: 'success',
        data: materiauxes
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
        const caracteristique_valeurs = new CaracteristiqueValeur()
        caracteristique_valeurs.texte = data.texte
        caracteristique_valeurs.id_materiaux = data.id_materiaux
        // caracteristique_valeurs.id_type = data.id_type
        await caracteristique_valeurs.save()

      return response.send({
        status: 'success',
        data: caracteristique_valeurs
      })
    } catch (error) {
      return response.status(500).send({
        status: 'error',
        code: error.code,
        message: 'Une erreur a été rencontrée lors du chargement des commandes : ' + error.message
      })
    }
  }

  async insertCaraVal ({ request, response}) {
    try {
      console.log(request.post())
      // Récupération de la liste des commandes
        const data = request.post()
        const caracteristique_valeurs = new CaracteristiqueValeur()
        if (data.id_caracteristique == null || data.id_materiaux == null){
          caracteristique_valeurs.texte = data.texte
          caracteristique_valeurs.id_materiaux = data.id_materiaux
          caracteristique_valeurs.id = data.id_caracteristique
          await caracteristique_valeurs.save()
        }

      return response.send({
        status: 'success',
        data: caracteristique_valeurs
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
      const caracteristique_valeurs = await CaracteristiqueValeur.query()
        .table('caracteristique_valeurs')
        .where('id_caracteristique', params.id)
        .delete()

      return response.send({
        status: 'success',
        data: caracteristique_valeurs
      })
    } catch (error) {
      return response.status(500).send({
        status: 'error',
        code: error.code,
        message: 'Une erreur a été rencontrée lors du chargement des commandes : ' + error.message
      })
    }
  }

  async deleteCaraVal ({ params, response}) {
    try {
      console.log(params)

      const caracteristique_valeurs = await CaracteristiqueValeur.query()
        .table('caracteristique_valeurs')
        .where('id', params.id)
        .delete()

      return response.send({
        status: 'success',
        data: caracteristique_valeurs
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

      const caracteristique_valeurs = CaracteristiqueValeur

      if (data.id_carval != null){
        const del = await CaracteristiqueValeur.query()
        .table('caracteristique_valeurs')
        .where('id', data.id_carval)
        .andWhere('id_caracteristique', data.id_caracteristique)
        .delete()

        const caracteristique_valeurs = new CaracteristiqueValeur(data.id_carval)
        caracteristique_valeurs.id = data.id_carval
        caracteristique_valeurs.texte = data.texte
        caracteristique_valeurs.id_caracteristique = data.id_caracteristique
        caracteristique_valeurs.id_materiaux = data.id_materiaux
        await caracteristique_valeurs.save()
        } else {
          const caracteristique_valeurs = new CaracteristiqueValeur(data.id_carval)
          caracteristique_valeurs.texte = data.texte
          caracteristique_valeurs.id_caracteristique = data.id_caracteristique
          caracteristique_valeurs.id_materiaux = data.id_materiaux
          await caracteristique_valeurs.save()
        }


        /*const caracteristique_valeurs = await CaracteristiqueValeur.query()
        .table('caracteristique_valeurs')
        .where('id_caracteristique', params.id)
        .andWhere('id_materiaux', data.id_materiaux)
        .andWhere('id', data.id_carval)
        .update({
          'texte': data.texte
        })*/

     /* if(caracteristique_valeurs.texte == null){
        caracteristique_valeurs.texte == ''
        const caracteristique_valeurs = new CaracteristiqueValeur()
        caracteristique_valeurs.texte = data.texte
        caracteristique_valeurs.id_caracteristique = data.id_caracteristique
        caracteristique_valeurs.id_materiaux = data.id_materiaux
      } else {
        const caracteristique_valeurs = await CaracteristiqueValeur.query()
        .table('caracteristique_valeurs')
        .where('id_caracteristique', params.id)
        .andWhere('id_materiaux', data.id_materiaux)
        .update({
          'texte': data.texte
        })
        await caracteristique_valeurs.save()
      }*/

      return response.send({
        status: 'success',
        data: caracteristique_valeurs
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

module.exports = CaracteristiqueValeurController
