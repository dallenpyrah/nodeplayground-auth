import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class MonkeysService {
  // I am making two different variables because I want to try it different ways and this might allow for more data manipulation.
  async deleteMonkey(id, userId) {
    const monkey = await this.getMonkeyById(id)
    if (monkey.creatorid !== userId) {
      throw new BadRequest('This is not your monkey you can not delete this.')
    }
    const deletedMonkey = await dbContext.Monkey.findOneAndDelete({ _id: id, creatorId: userId })
    return deletedMonkey
  }

  async editMonkey(id, body, userId) {
    const monkey = await this.getMonkeyById(id)
    if (monkey.creatorId !== userId) {
      throw new BadRequest('This is not your monkey you can not edit this. ')
    }
    const editedMonkey = await dbContext.Monkey.findOneAndUpdate({ _id: id, creatorId: userId }, body)
    return editedMonkey
  }

  async createMonkey(body) {
    const monkey = await dbContext.Monkey.create(body)
    return monkey
  }

  async getMonkeyById(id) {
    const monkey = await dbContext.Monkey.findById(id)
    if (!monkey) {
      throw new BadRequest('Invalid Id --> No Monkey Found.')
    }
    return monkey
  }

  async find(query = {}) {
    const monkeys = await dbContext.Monkey.find(query)
    if (!monkeys) {
      throw new BadRequest('Bad Request ---> No monkeys found')
    }
    return monkeys
  }
}

export const monkeysService = new MonkeysService()
