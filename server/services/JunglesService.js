import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class JunglesService {
  async deleteJungle(id, userId) {
    const jungle = await this.findById(id)
    if (jungle.creatorId !== userId) {
      throw new BadRequest('You can not delete this you are not the creator')
    }
    const deletedJungle = await dbContext.Jungle.findOneAndDelete({ _id: id, creatorId: userId })
    return deletedJungle
  }

  async editJungle(id, userId, body) {
    const jungle = await this.findById(id)
    if (jungle.creatorId !== userId) {
      throw new BadRequest('You can not edit this you are not the creator')
    }
    const editedJungle = await dbContext.Jungle.findOneAndUpdate({ _id: id, creatorId: userId }, body)
    return editedJungle
  }

  async createJungle(body) {
    const jungle = await dbContext.Jungle.create(body)
    return jungle
  }

  async findById(id) {
    const jungle = await dbContext.Jungle.findById(id)
    if (!jungle) {
      throw new BadRequest('Invalid Id')
    }
    return jungle
  }

  async find(query = {}) {
    const jungles = await dbContext.Jungle.find(query)
    return jungles
  }
}

export const junglesService = new JunglesService()
