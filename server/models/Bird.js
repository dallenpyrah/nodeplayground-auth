import mongoose from 'mongoose'
const { Schema } = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId

const Bird = new Schema(
  {
    name: { type: String, required: true },
    canFly: { type: Boolean, required: true },
    ageYears: { type: Number, required: true },
    color: { type: String, required: true },
    lengthInches: { type: Number },
    jungleId: { type: ObjectId, ref: 'Jungle', required: true },
    creatorId: { type: String, ref: 'Account', required: true }
  }, { timestamps: true, toJSON: { virtuals: true } }
)

export default Bird
