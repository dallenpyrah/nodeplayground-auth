import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import AccountSchema from '../models/Account'
import CarSchema from '../models/Car'
import JungleSchema from '../models/Jungle'
import MonkeySchema from '../models/Monkey'
class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Car = mongoose.model('Car', CarSchema);

  Jungle = mongoose.model('Jungle', JungleSchema)

  Monkey = mongoose.model('Monkey', MonkeySchema)
}

export const dbContext = new DbContext()
