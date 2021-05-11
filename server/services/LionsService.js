import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class LionsService {
  async editLion(id, body, userId) {
    const lion = await this.findById(id)
    if (lion.creatorId !== userId) {
      throw new BadRequest('You are not the creator, you can not edit this lion.')
    }
    return await dbContext.Lion.findOneAndUpdate({ _id: id, creatorId: userId }, body).populate('creator')
  }

  async deleteLion(id, userId) {
    const lion = await this.findById(id)
    if (lion.creatorId !== userId) {
      throw new BadRequest('You are not the creator, you can not delete this lion.')
    }
    return await dbContext.Lion.findOneAndDelete({ _id: id, creatorId: userId })
  }

  async createLion(body) {
    return await dbContext.Lion.create(body)
  }

  async findById(id) {
    const lion = await dbContext.Lion.findById(id).populate('creator')
    if (!lion) {
      throw new BadRequest('Invalid Id: No lion found.')
    }
    return lion
  }

  async find(query = {}) {
    const lions = await dbContext.Lion.find(query).populate('creator')
    if (!lions) {
      throw new BadRequest('No lions found')
    }
    return lions
  }
}

export const lionsService = new LionsService()
