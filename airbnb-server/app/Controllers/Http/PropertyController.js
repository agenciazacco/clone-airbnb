'use strict'
const Property = use('App/Models/Property')


class PropertyController {

  async index ({ request, response, view }) {
    const propeties = Property.all()
    return propeties
  }

  async store ({ request, response }) {
  }


  async show ({ params }) {
    const property = await Property.findOrFail(params.id)
    await property.load('images')
    return property
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, auth, response }) {
    const property = await Property.findOrFail(params.id)
    if(property.user.id === auth.user.id)
      return response.status(401).send({error: 'Not authorized'})
      await property.delete()
  }
}

module.exports = PropertyController
