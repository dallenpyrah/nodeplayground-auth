import { carsService } from '../services/CarsService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class CarsController extends BaseController {
  constructor() {
    super('api/cars')
    this.router
      .get('', this.getAllCars)
      .get('/:id', this.getCarById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createCar)
      .delete('/:id', this.deleteCar)
      .put('/:id', this.editCar)
  }

  async getAllCars(req, res, next) {
    try {
      return res.send(await carsService.find())
    } catch (error) {
      next(error)
    }
  }

  async getCarById(req, res, next) {
    try {
      return res.send(await carsService.findById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async createCar(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      return res.send(await carsService.createCar(req.body))
    } catch (error) {
      next(error)
    }
  }

  async editCar(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      return res.send(await carsService.editCar(req.params.id, req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteCar(req, res, next) {
    try {
      return res.send(await carsService.deleteCar(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }
}
