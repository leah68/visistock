
'use strict'

const Utilisateur = use('App/Models/utilisateur')
const Materiaux = use('App/Models/materiaux')

class UserController {

 async list ({ request, response }) {
    try {
      // Récupération de la liste des commandes
      // const utilisateurs = await Utilisateur.all()

      const utilisateurs = await Utilisateur.query()
        .select('utilisateurs.id', 'utilisateurs.nom as utilisateurnom', 'prenom')
        .from('utilisateurs')
        .leftJoin('materiauxes', 'utilisateurs.id', 'materiauxes.id_utilisateur')
        .with('materiauxes', (builder) => builder.withCount('id as nbmat'))

      // const nbmat = await Materiaux.query()
      //   .select('nom')
      //   .from('materiauxes')
      //   .getCount('id')

      return response.send({
        status: 'success',
        data: utilisateurs,
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
      const utilisateurs = await Utilisateur.query()
      .select('*')
      .from('utilisateurs')
      .where('id', params.id)
      .first()

      return response.send({
        status: 'success',
        data: utilisateurs
      })
    } catch (error) {
      return response.status(500).send({
        status: 'error',
        code: error.code,
        message: 'Une erreur a été rencontrée lors du chargement des commandes : ' + error.message
      })
    }
  }

  async getMateriel ({ params, request, response }) {
    try {
      // Récupération de la liste des commandes
      const materiauxes = await Materiaux.query()
      .select('materiauxes.id','materiauxes.nom')
      .from('materiauxes')
      .where('utilisateurs.id', params.id)
      .innerJoin('utilisateurs', 'materiauxes.id_utilisateur', 'utilisateurs.id')

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

	
/*async list({ request, response }) {
    try {
      // Récupération de la liste des commandes
      const utilisateurs = await Utilisateur.query()
				.select('utilisateurs.nom')
        .fetch()
      return response.send({
        status: 'success',
        data: utilisateurs
      })
    } catch(error) {
      return response.status(500).send({
        status: 'error',
        code: error.code,
        message: 'Une erreur a été rencontrée lors du chargement des commandes : ' + error.message
      })
    }
	}
}*/

  async insert ({ request, response}) {
    try {
      console.log(request.post())
      // Récupération de la liste des commandes
        const data = request.post()
        const utilisateurs = new Utilisateur()
        utilisateurs.nom = data.nom
        utilisateurs.prenom = data.prenom
        await utilisateurs.save()

      return response.send({
        status: 'success',
        data: utilisateurs
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
      const utilisateurs = await Utilisateur.query()
        .table('utilisateurs')
        .where('id', params.id)
        .delete()

      return response.send({
        status: 'success',
        data: utilisateurs
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

      const utilisateurs = await Utilisateur.query()
        .table('utilisateurs')
        .where('id', params.id)
        .update({
          'nom': data.nom,
          'prenom': data.prenom
        })

      return response.send({
        status: 'success',
        data: utilisateurs
      })
    } catch (error) {
      return response.status(500).send({
        status: 'error',
        code: error.code,
        message: 'Une erreur a été rencontrée lors du chargement des commandes : ' + error.message
      })
    }
  }

  async addMat ({ params, request, response}) {
    try {
      const id = params.id
      const data = request.post()
      //console.log('params', id)
      //console.log('data', data)

        const materiauxes = []
        console.log(data)
        for (let i in data.id_materiaux) {
          materiauxes.push(i)
          const mat = await Materiaux.query()
          .from('materiauxes')
          .whereIn('id', [i])
          .update({
            'id': [i],
            'id_utilisateur': data.id_utilisateur
          })
        }

        //await Materiaux.createMany(materiauxes)

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
}

module.exports = UserController

/*const userId = await Database
  .insert({username: 'foo', ...})
  .into('users')*/