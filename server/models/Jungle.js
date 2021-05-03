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

export default Jungle
