import { Schema } from 'mongoose'

const Car = new Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    miles: { type: Number, required: true },
    color: { type: String, required: true },
    year: { type: Number, required: true },
    creatorId: { type: String, ref: 'Account', required: true },
    seats: { type: Number }
  }, { timestamps: true, _id: false, toJSON: { virtuals: true } }
)

Car.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
export default Car
