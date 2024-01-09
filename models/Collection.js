import mongoose from '../config/database.js'

// Collection Model
const collectionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seriesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Series',
    required: true
  },
  volumes: [
    {
      coverImageUrl: { type: String },
      volumeNumber: { type: Number, required: true },
      status: {
        type: String,
        enum: ['Need to Purchase', 'Missing', 'Damaged', 'Owned'],
        default: 'Owned'
      }
    }
  ]
})

const Collection = mongoose.model('Collection', collectionSchema)

export default Collection
