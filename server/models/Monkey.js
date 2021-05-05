import mongoose from 'mongoose'
const { Schema } = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId

const Monkey = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    favoriteFood: { type: String },
    canFight: { type: Boolean, required: true },
    children: { type: Number },
    jungleId: { type: ObjectId, ref: 'Jungle', required: true },
    creatorId: { type: String, ref: 'Account', required: true }
  }, { timestamps: true, toJSON: { virtuals: true } })

Monkey.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
export default Monkey
