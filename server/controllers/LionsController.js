import { Auth0Provider } from '@bcwdev/auth0provider'
import { lionsService } from '../services/LionsService'
import BaseController from '../utils/BaseController'

export class LionsController extends BaseController {
  constructor() {
    super('api/lions')
    this.router
      .get('', this.getAllLions)
      .get('/:id', this.getLionById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createLion)
  }

  async getAllLions(req, res, next) {
    try {
      return res.send(await lionsService.find())
    } catch (error) {
      next(error)
    }
  }

  async getLionById(req, res, next) {
    try {
      return res.send(await lionsService.findById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async createLion(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      return res.send(await lionsService.createLion(req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteLion(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      return res.send(await lionsService.deleteLion(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }

  async editLion(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      return res.send(await lionsService.editLion(req.params.id, req.body, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }
}
