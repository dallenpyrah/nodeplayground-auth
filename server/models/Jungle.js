import { Schema } from 'mongoose'

const Jungle = new Schema(
  {
    location: { type: String, required: true },
    size: { type: String, required: true },
    climate: { type: String, required: true },
    jungleAge: { type: Number },
    population: { type: Number, required: true },
    creatorId: { type: String, ref: 'Account', required: true }
  }, { timestamps: true, toJSON: { virtuals: true } }
)

Jungle.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
export default Jungle
