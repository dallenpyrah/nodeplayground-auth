import { Auth0Provider } from '@bcwdev/auth0provider'
import { birdsService } from '../services/BirdsService'
import BaseController from '../utils/BaseController'
export class BirdsController extends BaseController {
  constructor() {
    super('api/birds')
    this.router
      .get('', this.getAllBirds)
      .get('/:id', this.getBirdById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBird)
      .put('/:id', this.editBird)
  }

  async getAllBirds(req, res, next) {
    try {
      return res.send(await birdsService.find())
    } catch (error) {
      next(error)
    }
  }

  async getBirdById(req, res, next) {
    try {
      return res.send(await birdsService.findById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async createBird(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.Id
      return res.send(await birdsService.createBird(req.body))
    } catch (error) {
      next(error)
    }
  }

  async editBird(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.Id
      return res.send(await birdsService.editBird(req.params.id, req.body, req.userInfo.Id))
    } catch (error) {
      next(error)
    }
  }

  async deleteBird(req, res, next) {
    try {
      return res.send(await birdsService.deleteBird(req.params.id, req.userInfo.Id))
    } catch (error) {
      next(error)
    }
  }
}
