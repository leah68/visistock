'use strict'

const Emplacement = use('App/Models/Emplacement')

class EmplacementController {
	async list ({request, response }) {
    try {

      const emplacements  = await Emplacement.all()

      return response.send({
        status: 'success',
        data: emplacements
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

      const emplacements = await Emplacement.query()
        .table('emplacements')
        .where('id', params.id)
        .delete()

      return response.send({
        status: 'success',
        data: emplacements
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

        const data = request.post()
        const emplacements = new Emplacement()
        emplacements.nom = data.nom
        await emplacements.save()

      return response.send({
        status: 'success',
        data: emplacements
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

      const emplacements = await Emplacement.query()
        .table('emplacements')
        .where('id', params.id)
        .update({
          'nom': data.nom,
        })

      return response.send({
        status: 'success',
        data: emplacements
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

module.exports = EmplacementController
