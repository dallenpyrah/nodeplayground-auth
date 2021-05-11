import { Auth0Provider } from '@bcwdev/auth0provider'
import { tigersService } from '../services/TigersService'
import BaseController from '../utils/BaseController'

export class TigersController extends BaseController {
  constructor() {
    super('api/tigers')
    this.router
      .get('', this.getAllTigers)
      .get('/:id', this.getTigerById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTiger)
      .put('/:id', this.editTiger)
      .delete('/:id', this.deleteTiger)
  }

  async getAllTigers(req, res, next) {
    try {
      return res.send(await tigersService.find())
    } catch (error) {
      next(error)
    }
  }

  async getTigerById(req, res, next) {
    try {
      return res.send(await tigersService.findById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async createTiger(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      return res.send(await tigersService.createTiger(req.body))
    } catch (error) {
      next(error)
    }
  }

  async editTiger(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      return res.send(await tigersService.editTiger(req.body, req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }

  async deleteTiger(req, res, next) {
    try {
      return res.send(await tigersService.deleteTiger(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }
}
