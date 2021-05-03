import { Schema } from 'mongoose'

const Car = new Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    miles: { type: Number, required: true },
    color: { type: String, required: true },
    year: { type: Number, required: true },
    seats: { type: Number }
  }, { timestamps: true, _id: false, toJSON: { virtuals: true } }
)

export default Car
