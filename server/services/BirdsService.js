import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BirdsService {
  async deleteBird(id, userId) {
    const bird = await this.findById(id)
    if (bird.creatorId !== userId) {
      throw new BadRequest('You are not the creator you can not delete this bird')
    }
    const birdDeleted = await dbContext.Bird.findOneAndDelete({ _id: id, creatorId: userId }).populate('creator')
    return birdDeleted
  }

  async editBird(id, body, userId) {
    const bird = await this.findById(id)
    if (bird.creatorId !== userId) {
      throw new BadRequest('You are not the creator you can not edit this.')
    }
    const editedBird = await dbContext.Bird.findOneAndUpdate({ _id: id, creatorId: userId }, body).populate('creator')
    return editedBird
  }

  async createBird(body) {
    const bird = await dbContext.Bird.create(body)
    return bird
  }

  async findById(id) {
    const bird = await dbContext.Bird.findById(id).populate('creator')
    if (!bird) {
      throw new BadRequest('Invalid Id --> Bird does not exist')
    }
    return bird
  }

  async find(query = {}) {
    const birds = await dbContext.Bird.find(query).populate('creator')
    if (!birds) {
      throw new BadRequest('Invalid Query Request')
    }
    return birds
  }
}

export const birdsService = new BirdsService()
