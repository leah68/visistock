'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

// Route.get(url, 'UserController.index')

//utilisateur
Route.get('api/utilisateurs/:id/materiaux', 'UserController.getMateriel')
Route.get('api/utilisateurs/:id', 'UserController.selectOne')
Route.get('api/utilisateurs', 'UserController.list')
Route.post('api/utilisateurs', 'UserController.insert')
Route.delete('api/utilisateurs/:id', 'UserController.delete')
Route.put('api/utilisateurs/:id', 'UserController.update')
Route.put('api/utilisateurs/:id/materiaux', 'UserController.addMat')

//type
Route.get('api/types', 'TypeController.list')
Route.get('api/types/:id', 'TypeController.lireId')
Route.post('api/types', 'TypeController.insert')
Route.delete('api/types/:id', 'TypeController.delete')
Route.put('api/types/:id', 'TypeController.update')

//caracteristiques
Route.get('api/caracteristiques', 'CaracteristiqueController.list')
Route.post('api/caracteristiques', 'CaracteristiqueController.insert')
Route.delete('api/caracteristiques/:id', 'CaracteristiqueController.delete')
Route.put('api/caracteristiques/:id', 'CaracteristiqueController.update')
Route.get('api/caracteristiques/:id', 'CaracteristiqueController.selectOne')
Route.get('api/caracteristiques/:id/edit', 'CaracteristiqueController.selectCaraEdit')

//connectiques
Route.get('api/connectiques', 'ConnectiqueController.list')
Route.post('api/connectiques', 'ConnectiqueController.insert')
Route.delete('api/connectiques/:id', 'ConnectiqueController.delete')
Route.put('api/connectiques/:id', 'ConnectiqueController.update')
//Route.get('api/connectiques/:id/edit', 'ConnectiqueController.selectEdit')

//caracteristiquevaleurs
Route.get('api/caracteristique_valeurs', 'CaracteristiqueValeurController.list')
Route.post('api/caracteristique_valeurs', 'CaracteristiqueValeurController.insert')
Route.delete('api/caracteristique_valeurs/:id', 'CaracteristiqueValeurController.delete')
Route.delete('api/caracteristique_valeurs/:id/delete', 'CaracteristiqueValeurController.deleteCaraVal')
Route.put('api/caracteristique_valeurs/:id', 'CaracteristiqueValeurController.update')
//Route.get('api/caracteristique_valeurs/:id', 'CaracteristiqueValeurController.selectEdit')
Route.post('api/caracteristique_valeurs/:id', 'CaracteristiqueValeurController.insertCaraVal')

//materiauxes
Route.get('api/materiauxes/:id/caracteristique_valeurs', 'MateriauxController.selectCaraVal')
Route.get('api/materiauxes', 'MateriauxController.list')
Route.get('api/materiauxes/:id', 'MateriauxController.selectNotUser')
Route.get('api/materiauxes/:id/affichage', 'MateriauxController.selectOneMat')
Route.post('api/materiauxes', 'MateriauxController.insert')
Route.delete('api/materiauxes/:id', 'MateriauxController.delete')
Route.put('api/materiauxes/:id', 'MateriauxController.update')
Route.put('api/materiauxes/:id/:id', 'MateriauxController.updateMat')
Route.get('api/materiauxes/:id/edit', 'MateriauxController.selectEdit')

//caracteristiquetype
Route.get('api/caracteristique_types', 'CaracteristiqueTypeController.list')

//emplacement
Route.get('api/emplacements', 'EmplacementController.list')
Route.post('api/emplacements', 'EmplacementController.insert')
Route.delete('api/emplacements/:id', 'EmplacementController.delete')
Route.put('api/emplacements/:id', 'EmplacementController.update')

//divers
Route.any('*', 'NuxtController.render')
