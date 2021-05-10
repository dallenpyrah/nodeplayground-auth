import mongoose, { Schema } from 'mongoose'

const ObjectId = mongoose.SchemaTypes.ObjectId

const Lion = new Schema({
  name: { type: String, required: true },
  weightLb: { type: Number, required: true },
  age: { type: Number, required: true },
  children: { type: Number },
  kingOfTheJungle: { type: Boolean },
  jungleId: { type: ObjectId, ref: 'Jungle', required: true },
  creatorId: { type: String, ref: 'Account', required: true }

}, { timestamps: true, toJSON: { virtuals: true } })

Lion.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
export default Lion
