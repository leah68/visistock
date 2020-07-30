'use strict'

const CaracteristiqueType = use('App/Models/Caracteristique_type')

const Caracteristique = use('App/Models/Caracteristique')
const Type = use('App/Models/Type')

//const caracteristique_types = await CaracteristiqueType.find(id_params)
//const caracteristiques = await caracteristique_types.caracteristiques().fetch()

class CaracteristiqueTypeController {

  async list ({ params, request, response }) {
    try {

      const caracteristique_types = CaracteristiqueType.query()
      .select('id_caracteristique')
      .from('caracteristique_types')
      .where('id_type', params.id)
      console.log('id_cara ' + caracteristique_types)

      return response.send({
        status: 'success',
        data: caracteristique_types
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

      const caracteristique_types = await CaracteristiqueType.find(params.id)

      const caracteristiques = await caracteristique_types
        .caracteristiques()
        .where('id_caracteristique', params.id)
        .update({
          'id_type': data.id_type,
          'id_caracteristique': data.id_caracteristique
        })

      /*const caracteristique_types = await CaracteristiqueType.query()
        .table('caracteristique_types')
        .where('id', params.id)
        .update({
          'id_type': data.id_type,
          'id_caracteristique': data.id_caracteristique
        })*/

        //.innerJoin('types', 'caracteristique_types.id_type', 'types.id')
       	//.innerJoin('caracteristiques', 'caracteristique_types.id_caracteristique', 'caracteristiques.id')

      /*const caracteristiques = await Caracteristique.query()
        .table('caracteristiques')
        .innerJoin('caracteristique_types', 'caracteristiques.id', 'caracteristique_types.id_caracteristique')

      const types = await Type.query()
     	  .table('types')
        .innerJoin('caracteristique_types', 'types.id', 'caracteristique_types.id_type')*/

        return response.send({
        status: 'success',
        data: caracteristique_types
      })
    } catch (error) {
      return response.status(500).send({
        status: 'error',
        code: error.code,
        message: 'Une erreur a été rencontrée lors du chargement des commandes : ' + error.message
      })
    }
  }



  async insert ({ params, request, response}) {
    try {
      console.log(request.post())
      // Récupération de la liste des commandes
        const data = request.post()
        const caracteristique_types = new CaracteristiqueType()

        const caracteristique_types = await CaracteristiqueType.find(params.id)

        const caracteristiques = await caracteristique_types
          .caracteristiques()
          .insert({
            'id_type': data.id_type,
            'id_caracteristique': data.id_caracteristique
          })

        await caracteristiques_types.save()

      return response.send({
        status: 'success',
        data: types
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

module.exports = CaracteristiqueTypeController
