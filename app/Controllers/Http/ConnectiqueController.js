'use strict'

const Connectique = use('App/Models/connectique')

const ConnectiqueMateriaux = use('App/Models/connectique_materiaux')

class ConnectiqueController {
	async list ({ request, response }) {
    try {
      // Récupération de la liste des commandes
      const connectiques = await Connectique.all()
      return response.send({
        status: 'success',
        data: connectiques
      })
    } catch (error) {
      return response.status(500).send({
        status: 'error',
        code: error.code,
        message: 'Une erreur a été rencontrée lors du chargement des commandes : ' + error.message
      })
    }
  }

  /*async selectEdit ({params, request, response }) {
    try {
      const id = params.id
      console.log(id)

      const connectique_materiauxes = await ConnectiqueMateriaux.query()
        .select('id_connectique')
        .from('connectique_materiauxes')
        .where('id_materiaux', params.id)
        .innerJoin('connectiques', 'connectique_materiauxes.id_connectique', 'connectiques.id')

      return response.send({
        status: 'success',
        data: connectique_materiauxes
      })
    } catch (error) {
      return response.status(500).send({
        status: 'error',
        code: error.code,
        message: 'Une erreur a été rencontrée lors du chargement des commandes : ' + error.message
      })
    }
  }*/
  
  async insert ({ request, response}) {
    try {
      console.log(request.post())
      // Récupération de la liste des commandes
        const data = request.post()
        const connectiques = new Connectique()
        connectiques.type = data.type
        await connectiques.save()

      return response.send({
        status: 'success',
        data: connectiques
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
      const connectiques = await Connectique.query()
        .table('connectiques')
        .where('id', params.id)
        .delete()

      return response.send({
        status: 'success',
        data: connectiques
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

      const connectiques = await Connectique.query()
        .table('connectiques')
        .where('id', params.id)
        .update({
          'type': data.type
        })

      return response.send({
        status: 'success',
        data: connectiques
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


module.exports = ConnectiqueController
