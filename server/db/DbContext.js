import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import AccountSchema from '../models/Account'
import CarSchema from '../models/Car'
import JungleSchema from '../models/Jungle'
import MonkeySchema from '../models/Monkey'
import BirdSchema from '../models/Bird'
import LionSchema from '../models/Lion'
class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Car = mongoose.model('Car', CarSchema);

  Jungle = mongoose.model('Jungle', JungleSchema)

  Monkey = mongoose.model('Monkey', MonkeySchema)

  Bird = mongoose.model('Bird', BirdSchema)

  Lion = mongoose.model('Lion', LionSchema)
}

export const dbContext = new DbContext()
