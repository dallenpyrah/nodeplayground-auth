import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TigersService {
  async editTiger(body, id, userId) {
    const tiger = await this.findById(id)
    if (tiger.creatorId !== userId) {
      throw new BadRequest('You are not the creator you can not edit this tiger')
    }
    return await dbContext.Tiger.findOneAndUpdate({ _id: id, creatorId: userId }, body)
  }

  async deleteTiger(id, userId) {
    const tiger = await this.findById(id)
    if (tiger.creatorId !== userId) {
      throw new BadRequest('You are not the creator you can not delete this tiger')
    }
    return await dbContext.Tiger.findOneAndDelete({ _id: id, creatorId: userId })
  }

  async createTiger(body) {
    return await dbContext.Tiger.create(body)
  }

  async findById(id) {
    const tiger = await dbContext.Tiger.findById(id)
    if (!tiger) {
      throw new BadRequest('Invalid ID: No tiger found')
    }
    return tiger
  }

  async find(query = {}) {
    return await dbContext.Tiger.find(query)
  }
}

export const tigersService = new TigersService()
