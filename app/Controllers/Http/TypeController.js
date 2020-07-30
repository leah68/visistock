'use strict'

const Database = use('Database')
const Type = use('App/Models/Type')

const CaracteristiqueType = use('App/Models/Caracteristique_Type')
const Caracteristique = use('App/Models/Caracteristique')
//const CaracteristiqueType = use('App/Models/Caracteristique_Type')

//const CaracteristiqueType = use('App/Models/Caracteristique_Type')

class TypeController {
	async list ({request, response }) {
    try {

      const types = await Type.all()

      /*const caracteristique_types = await CaracteristiqueType.all()
      caracteristique_types.id = this.id_type*/

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

  async lireId ({ params, request, response }) {
    try {

      console.log(params.id)

      const caracteristique_types = await CaracteristiqueType.query()
      .select('caracteristique_types.id_caracteristique', 'caracteristiques.nom')
      .innerJoin('caracteristiques', 'caracteristique_types.id_caracteristique', 'caracteristiques.id')
      .where('caracteristique_types.id_type', params.id)
      .fetch()

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



  async insert ({ request, response}) {
    try {
      console.log(request.post())

        const data = request.post()
        const types = new Type()
        types.nom = data.nom

        await types.save()
        console.log(types.id)

        /*const caracteristique_types = await CaracteristiqueType
          .insert({
            'id_type': types.id,
            'id_caracteristique': data.id_caracteristique
          })*/

        const caracteristique_types = []
        for (let i in data.id_caracteristique) {
          caracteristique_types.push({
            'id_type' : types.id,
            'id_caracteristique': data.id_caracteristique[i]
          })
        }

        console.log(data.id_caracteristique)
        caracteristique_types.id_type = types.id
        caracteristique_types.id_caracteristique = data.id_caracteristique
        await CaracteristiqueType.createMany(caracteristique_types)
        console.log('OK', caracteristique_types)

        /*const caracteristique_types = request.collect(['"id_type"', '"id_caracteristique"'])
        await CaracteristiqueType.createMany(caracteristique_types)
        console.log(caracteristique_types.id_type)
        console.log(caracteristique_types.id_caracteristique)*/

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

  async delete ({ params, request, response}) {
    try {

      /*const data = request.post()
      const caracteristique_types = []
      for (let i in data.id_caracteristique) {
        caracteristique_types.push({
          'id_type' : types.id,
          'id_caracteristique': data.id_caracteristique[i]
        })
      }

      console.log(caracteristique_types)
      //caracteristique_types.id_type = id_type
      //caracteristique_types.id_caracteristique = data.id_caracteristique
      await CaracteristiqueType.createMany(caracteristique_types)

      const types = await Type.query()
      .table('types')
      .where('id', params.id)
      .innerJoin('caracteristique_types')
      .where('types.id', params.id)
      .orWhere('id_caracteristique', data.id_caracteristique)
      .delete()*/

      //const caracteristique_types = request.collect(['id_type', 'id_caracteristique'])
      //caracteristique_types.id_type = types.id
      //caracteristique_types.id_caracteristique = data.id_caracteristique
      /*const types = await Type.query()
        .table('types')
        .innerJoin('caracteristique_types', 'types.id', 'caracteristique_types.id_type')
        .where('types.id', params.id)
        .orWhere('caracteristique_types.id_type', params.id)
        .delete()*/
      const caracteristique_types = await CaracteristiqueType.query()
        .table('caracteristique_types')
        .where('id_type', params.id)
        .delete()

      const types = await Type.query()
        .table('types')
        .where('types.id', params.id)
        .delete()

        //DELETE FROM `caracteristique_types` WHERE `caracteristique_types`.`id_type` = 104;

      /*const caracteristique_types = await CaracteristiqueType.query()
        .table('caracteristique_types')
        //.alter('caracteristique_types').unique('id_type', 'id_caracteristique')
        //.alterTable('caracteristique_types').addConstraint(caracteristique_types_id_type_foreign).foreign('id_type').references('id').inTable('types').onDelete('cascade')
        .delete()*/


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




  async update ({ params, request, response}) {
    try {
      const id = params.id
      const data = request.post()
      console.log('params', id)
      console.log('data', data)

      const types = await Type.query()
        .table('types')
        .where('id', params.id)
        .update({
          'nom': data.nom
        })

      const del = await CaracteristiqueType.query()
        .table('caracteristique_types')
        .where('id_type', params.id)
        .delete()

      /*const caracteristique_types = request.collect(['id_type', 'id_caracteristique'])
        console.log(data.id_caracteristique)
        caracteristique_types.id_caracteristique = data.id_caracteristique
      await CaracteristiqueType.createMany(caracteristique_types)*/


      const caracteristique_types = []
      for (let i in data.id_caracteristique) {
        caracteristique_types.push({
          'id_type' : params.id,
          'id_caracteristique': data.id_caracteristique[i]
        })
      }

      console.log(params.id)
      //caracteristique_types.id_type = params.id
      //caracteristique_types.id_caracteristique = data.id_caracteristique
      await CaracteristiqueType.createMany(caracteristique_types)
      console.log('OK', caracteristique_types)


      /* const caracteristique_types = []
        for (let i in data.id_caracteristique) {
          caracteristique_types.push({
            'id_type' : params.id,
            'id_caracteristique': data.id_caracteristique[i]
          })
        }


        /*const caracteristique_types = request.collect(['id_type', 'id_caracteristique'])*/
        //caracteristique_types.id_type = params.id
        //caracteristique_types.id_caracteristique = data.id_caracteristique
        /*console.log('data::::'+ data.id_caracteristique)
        await CaracteristiqueType.createMany(caracteristique_types)*/


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


module.exports = TypeController
