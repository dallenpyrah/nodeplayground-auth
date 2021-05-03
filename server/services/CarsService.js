import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CarsService {
  async deleteCar(id, userInfoId) {
    const car = await this.findById(id)
    if (car.creatorId !== userInfoId) {
      throw new BadRequest('Invalid Id')
    }
    const deletedCar = await dbContext.Car.findOneAndDelete({ _id: id, creatorId: userInfoId })
    return deletedCar
  }

  async editCar(id, body, userId) {
    const car = await this.findById(id)
    if (car.creatorId !== userId) {
      throw new BadRequest('You are not the creator of this you can not edit')
    }
    const editedCar = await dbContext.Car.findByIdAndUpdate(id, body)
    return editedCar
  }

  async createCar(body) {
    const car = await dbContext.Car.create(body)
    return car
  }

  async findById(id) {
    const car = await dbContext.Car.findById(id).populate('creator')
    if (!car) {
      throw new BadRequest('Invalid Id')
    }
    return car
  }

  async find(query = {}) {
    const cars = await dbContext.Car.find(query).populate('creator')
    return cars
  }
}

export const carsService = new CarsService()
