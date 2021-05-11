import mongoose, { Schema } from 'mongoose'

const ObjectId = mongoose.SchemaTypes.ObjectId

const Tiger = new Schema({
  name: { type: String, required: true },
  weightLb: { type: Number, required: true },
  stripes: { type: Number, required: true },
  topSpeed: { type: Number, required: true },
  age: { type: Number, required: true },
  hunter: { type: Boolean, required: true },
  jungleId: { type: ObjectId, ref: 'Jungle', required: true },
  creatorId: { type: String, ref: 'Account', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

Tiger.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Tiger
