import { Auth0Provider } from '@bcwdev/auth0provider'
import { junglesService } from '../services/JunglesService'
import { monkeysService } from '../services/MonkeysService'
import BaseController from '../utils/BaseController'

export class JunglesController extends BaseController {
  constructor() {
    super('api/jungles')
    this.router
      .get('', this.getAllJungles)
      .get('/:id', this.getJungleById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id/monkeys', this.getMonkeyByJungleId)
      .post('', this.createJungle)
      .delete('/:id', this.deleteJungle)
      .put('/:id', this.editJungle)
  }

  async getMonkeyByJungleId(req, res, next) {
    try {
      return res.send(await monkeysService.find({ jungleId: req.params.id }))
    } catch (error) {
      next(error)
    }
  }

  async getAllJungles(req, res, next) {
    try {
      return res.send(await junglesService.find())
    } catch (error) {
      next(error)
    }
  }

  async getJungleById(req, res, next) {
    try {
      return res.send(await junglesService.findById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async createJungle(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const jungle = await junglesService.createJungle(req.body)
      return res.send(jungle)
    } catch (error) {
      next(error)
    }
  }

  async editJungle(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      const jungle = await junglesService.editJungle(req.params.id, req.userInfo.id, req.body)
      return res.send(jungle)
    } catch (error) {
      next(error)
    }
  }

  async deleteJungle(req, res, next) {
    try {
      const jungle = await junglesService.deleteJungle(req.params.id, req.userInfo.id)
      return res.send(jungle)
    } catch (error) {
      next(error)
    }
  }
}
