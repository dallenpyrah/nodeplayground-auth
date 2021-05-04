import { Auth0Provider } from '@bcwdev/auth0provider'
import { monkeysService } from '../services/MonkeysService'
import BaseController from '../utils/BaseController'

export class MonkeysController extends BaseController {
  constructor() {
    super('api/monkeys')
    this.router
      .get('', this.getAllMonkeys)
      .get('/:id', this.getMonkeyById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createMonkey)
      .delete('/:id', this.deleteMonkey)
      .put('/:id', this.editMonkey)
  }

  async getAllMonkeys(req, res, next) {
    try {
      return res.send(await monkeysService.find())
    } catch (error) {
      next(error)
    }
  }

  async getMonkeyById(req, res, next) {
    try {
      return res.send(await monkeysService.getMonkeyById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  // I could just return the request I am getting back from the monkeys service for anything below this comment.
  // I am doing it this way to show different ways of getting the same result and it may also allows us to change or protect more data later on.
  async createMonkey(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const monkey = await monkeysService.createMonkey(req.body)
      return res.send(monkey)
    } catch (error) {
      next(error)
    }
  }

  async editMonkey(req, res, next) {
    try {
      req.body.Id = req.params.id
      req.body.creatorId = req.userInfo.id
      const editedMonkey = await monkeysService.editMonkey(req.params.id, req.body, req.userInfo.id)
      return res.send(editedMonkey)
    } catch (error) {
      next(error)
    }
  }

  async deleteMonkey(req, res, next) {
    try {
      const deletedMonkey = await monkeysService.deleteMonkey(req.params.id, req.userInfo.id)
      return res.send(deletedMonkey)
    } catch (error) {
      next(error)
    }
  }
}
