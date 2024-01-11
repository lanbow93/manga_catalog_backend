import mongoose from '../config/database.js'

// Series Model
// Needed: title | volumes[{ volumeTitle | volumeNumber | mangaId}]
const seriesSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true },
  author: { type: String, required: true },
  coverFileName: { type: String, required: true },
  volumes: [
    {
      volumeNumber: { type: Number, required: true },
      status: {
        type: String,
        enum: ['Need to Purchase', 'Missing', 'Damaged', 'Owned'],
        default: 'Owned'
      }
    }
  ]
})

const Series = mongoose.model('Series', seriesSchema)

export default Series
