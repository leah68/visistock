'use strict'

const Materiaux = use('App/Models/materiaux')

const CaracteristiqueType =  use('App/Models/caracteristique_type')
const CaracteristiqueValeur = use('App/Models/caracteristique_valeur')
const ConnectiqueMateriaux = use('App/Models/connectique_materiaux')

class MateriauxController {
	async list ({ request, response }) {
    try {

      const materiauxes = await Materiaux.query()
        .select('materiauxes.id', 'materiauxes.nom', 'prenom', 'utilisateurs.nom as utilisateurnom', 'materiauxes.id_utilisateur', 'types.nom as type' /*, 'caracteristique_valeurs.texte', 'caracteristique_valeurs.id_caracteristique'*/)
        .from('materiauxes')
        .leftJoin('utilisateurs', 'materiauxes.id_utilisateur', 'utilisateurs.id')
        .leftJoin('caracteristique_types', 'materiauxes.id_type', 'caracteristique_types.id_type')
        .leftJoin('types', 'caracteristique_types.id_type', 'types.id')
        //.innerJoin('caracteristique_types', 'materiauxes.id_type', 'caracteristique_types.id_type')
        //.leftJoin('caracteristique_valeurs', 'materiauxes.id', 'caracteristique_valeurs.id_materiaux')

      /*const caracteristique_types = await CaracteristiqueType.all()
      console.log(caracteristique_types)*/

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


  async selectNotUser ({params, request, response }) {
    try {
      const id = params.id
      console.log(id)

      const materiauxes = await Materiaux.query()
        .select('*')
        .from('materiauxes')
        .where('id_utilisateur', null)

      /*const caracteristique_types = await CaracteristiqueType.all()
      console.log(caracteristique_types)*/

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

  async selectEdit ({params, request, response }) {
    try {
      const id = params.id
      console.log(id)

      const materiauxes = await Materiaux.query()
        .select('nom', 'id_materiel_liaison', 'id_utilisateur', 'id_type', 'id_emplacement')
        .from('materiauxes')
        .where('materiauxes.id', params.id)
        .first()

      const mat = await Materiaux.query()
        .select('caracteristique_valeurs.id', 'caracteristique_valeurs.texte')
        .from('materiauxes')
        .innerJoin('caracteristique_valeurs', 'materiauxes.id', 'caracteristique_valeurs.id_materiaux')
        .where('materiauxes.id', params.id)
        .first()

      const con = await Materiaux
        .query()
        .with('connectique_materiaux')
          .select('id_connectique', 'connectiques.type')
          .from('connectique_materiauxes')
          .innerJoin('connectiques', 'connectique_materiauxes.id_connectique', 'connectiques.id')
          .innerJoin('materiauxes', 'connectique_materiauxes.id_materiaux', 'materiauxes.id')
        .where('materiauxes.id', params.id)
        .fetch()


      return response.send({
        status: 'success',
        data: { 
          materiauxes: materiauxes,
          mat: mat,
          con: con
        }
      })
    } catch (error) {
      return response.status(500).send({
        status: 'error',
        code: error.code,
        message: 'Une erreur a été rencontrée lors du chargement des commandes : ' + error.message
      })
    }
  }

  async selectCaraVal ({params, request, response }) {
    try {
      const id = params.id
      console.log(id)

      const caracteristique_valeurs= await CaracteristiqueValeur.query()
        .select('*', 'materiauxes.nom')
        .from('caracteristique_valeurs')
        .where('id_materiaux', params.id)
        .innerJoin('materiauxes', 'caracteristique_valeurs.id_materiaux', 'materiauxes.id')
        .innerJoin('caracteristique_types', 'materiauxes.id_type', 'caracteristique_types.id_type')

        /*.select('caracteristique_valeurs.id', 'caracteristique_valeurs.texte')
        .from('materiauxes')
        .innerJoin('types', 'materiauxes.id_type', 'types.id')
        .where('materiauxes.id', 'materiauxes.id_type')
        .innerJoin('caracteristique_valeurs', 'materiauxes.id', 'caracteristique_valeurs.id_materiaux')
        .where('materiauxes.id', params.id)
        .first()*/

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

  async selectOneMat ({ params, request, response }) {
    try {
      // Récupération de la liste des commandes
      const materiauxes = await Materiaux.query()
      .select('*')
      .from('materiauxes')
      .where('id', params.id)
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
      //console.log(request.post())

        const data = request.post()
        const materiauxes = new Materiaux()
        materiauxes.nom = data.nom
        materiauxes.id_type = data.id_type
        //materiauxes.id_utilisateur = data.id_utilisateur
        //materiauxes.id_materiel_liaison = data.id_materiel_liaison
        materiauxes.id_emplacement = data.id_emplacement

        if( data.id_utilisateur == ''){
          materiauxes.id_utilisateur = null
        }else {
          materiauxes.id_utilisateur = data.id_utilisateur
        }
  
        if( data.id_materiel_liaison == ''){
          materiauxes.id_materiel_liaison = null
        }else {
          materiauxes.id_materiel_liaison = data.id_materiel_liaison
        }
        await materiauxes.save()

        const connectique_materiauxes = []
          console.log(data)
        for (let i in data.id_connectique) {
          connectique_materiauxes.push({
            'id_connectique': data.id_connectique[i],
            'id_materiaux': materiauxes.id
          })
        }
        //caracteristique_valeurs.id_materiaux = materiauxes.id
        //caracteristique_valeurs.id_caracteristique = data.caracteristique_value
        await ConnectiqueMateriaux.createMany(connectique_materiauxes)
        console.log('OK', connectique_materiauxes)

        const caracteristique_valeurs = []
        for (let i in data.caracteristique_value) {
          console.log(data)
          caracteristique_valeurs.push({
            'texte': data.caracteristique_value[i],
            'id_caracteristique': i,
            'id_materiaux': materiauxes.id
          })
        }
        //caracteristique_valeurs.id_materiaux = materiauxes.id
        //caracteristique_valeurs.id_caracteristique = data.caracteristique_value
        await CaracteristiqueValeur.createMany(caracteristique_valeurs)
        console.log('OK', caracteristique_valeurs)

        //const types = await Type.query()


        /*const caracteristique_types = []
        for (let i in data.id_caracteristique) {
          caracteristique_types.push({
            'id_type' : types.id,
            'id_caracteristique': data.id_caracteristique[i]
          })
        }*/

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

  async delete ({ params, response}) {
    try {
      console.log(params)

      const caracteristique_valeurs = await CaracteristiqueValeur.query()
        .table('caracteristique_valeurs')
        .where('id_materiaux', params.id)
        .delete()

      const connectique_materiauxes = await ConnectiqueMateriaux.query()
        .table('connectique_materiauxes')
        .where('id_materiaux', params.id)
        .delete()

      const materiauxes = await Materiaux.query()
        .table('materiauxes')
        .where('id', params.id)
        .delete()

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

  async update ({ params, request, response}) {
    try {
      const id = params.id
      const data = request.post()
      console.log(data)
      //console.log('params', id)
      //console.log('data', data)

      if( data.id_utilisateur == ''){
        const materiauxes = await Materiaux.query()
        .table('materiauxes')
        .where('id', params.id)
        .update({
          'id_utilisateur': null,
          })
        }else {
          const materiauxes = await Materiaux.query()
          .table('materiauxes')
          .where('id', params.id)
          .update({
            'id_utilisateur': data.id_utilisateur,
            })
        }

        if( data.id_materiel_liaison == ''){
          const materiauxes = await Materiaux.query()
          .table('materiauxes')
          .where('id', params.id)
          .update({
            'id_materiel_liaison': null,
            })
          }else {
            const materiauxes = await Materiaux.query()
            .table('materiauxes')
            .where('id', params.id)
            .update({
              'id_materiel_liaison': data.id_materiel_liaison,
              })
          }

      const materiauxes = await Materiaux.query()
        .table('materiauxes')
        .where('id', params.id)
        .update({
          'nom': data.nom,
          'id_type': data.id_type,
          //'id_utilisateur': data.id_utilisateur,
          //'id_materiel_liaison': data.id_materiel_liaison,
          'id_emplacement': data.id_emplacement
        })

      /*const del = await CaracteristiqueValeur.query()
      .table('caracteristique_valeurs')
      .where('id_materiaux', params.id)
      .delete()
      console.log('ok delete ' + params.id)*/

      const del_con = await ConnectiqueMateriaux.query()
      .table('connectique_materiauxes')
      .where('id_materiaux', params.id)
      .delete()

      /*for (let i in data.id_materiaux) {
        connectique_materiauxes.push()
        const mat = await ConnectiqueMateriaux.query()
        .from('connectique_materiauxes')
        .whereIn('id_materiauxes', materiauxes.id)
        .update({
          'id_materiaux': materiauxes.id,
          'id_connectique': data.id_connectique
        })
      }*/

      const connectique_materiauxes = []
      console.log(data)
      for (let i in data.id_connectique) {
        connectique_materiauxes.push({
          'id_connectique': data.id_connectique[i],
          'id_materiaux': params.id
        })
      }
      console.log('OK', connectique_materiauxes)
      await ConnectiqueMateriaux.createMany(connectique_materiauxes)
        /*const connectique_materiauxes = await ConnectiqueMateriaux.query()
        .from('connectique_materiauxes')
        .whereIn('id_materiaux', materiauxes.id)
        .update({
          'id_materiaux': materiauxes.id,
          'id_connectique': data.id_connectique
        })*/

      /*const caracteristique_valeurs = []
        for (let i in data.caracteristique_value) {
          //console.log(data)
          caracteristique_valeurs.push({
            'texte': data.caracteristique_value[i],
            'id_caracteristique': i,
            'id_materiaux': params.id
          })
        }
        await CaracteristiqueValeur.createMany(caracteristique_valeurs)
        console.log('OK', caracteristique_valeurs)*/

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

  async updateMat ({ params, response}) {
    try {
      const id = params.id
      console.log('params', id)

      const materiauxes = await Materiaux.query()
        .where('id', params.id)
        .update({
          'id_utilisateur': null,
        })

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


module.exports = MateriauxController
