import { Schema, model, Document, Model, HookNextFunction } from 'mongoose'
import convertSearchToCoords from '../utils/geocoder'

export interface IStore extends Document {
  name: string
  location?: {
    type: 'Point'
    coordinates: (number | undefined)[]
    address: string | undefined
  }
  address: string | undefined
}

const storeSchema: Schema<IStore> = new Schema<IStore>(
  {
    name: { type: String, required: true },
    location: {
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates: {
        type: [Number],
        index: '2dsphere'
      },
      address: String
    },
    address: { type: String, required: true }
  },
  { timestamps: true }
)

storeSchema.methods.toJSON = function() {
  const store = this.toObject()
  delete store.__v
  return store
}

storeSchema.pre<IStore>('save', async function(next: HookNextFunction) {
  const store = this
  const entry = await convertSearchToCoords(store.address!)
  const { latitude, longitude, formattedAddress } = entry[0] ?? {
    latitude: undefined,
    longitude: undefined,
    formattedAddress: undefined
  }

  this.location = latitude && longitude && formattedAddress ?  {
    type: 'Point',
    coordinates: [longitude, latitude],
    address: formattedAddress
  } : undefined

  this.address = undefined
  next()
})

const Store: Model<IStore> = model<IStore>('store', storeSchema)
export default Store
