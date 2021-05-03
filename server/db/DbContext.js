import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import AccountSchema from '../models/Account'
import CarSchema from '../models/Car'
import JungleSchema from '../models/Jungle'
class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Car = mongoose.model('Car', CarSchema);

  Jungle = mongoose.model('Jungle', JungleSchema)
}

export const dbContext = new DbContext()
