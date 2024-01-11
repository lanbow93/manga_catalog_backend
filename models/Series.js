import mongoose from '../config/database.js'

// Series Model
// Needed: mangadexId, userId, title, description, tags, author, coverFileName, volumes
const seriesSchema = new mongoose.Schema({
  mangadexId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  completionStatus: {type: String, required: true},
  tags: { type: [String], required: true },
  author: { type: String, required: true },
  coverUrl: { type: String, required: true },
  volumes: [
    {
      volumeNumber: { type: Number, required: true },
      status: {
        type: String,
        enum: ['Need to Purchase', 'Lost', 'Damaged', 'Owned'],
        default: 'Need To Purchase'
      }
    }
  ]
})

const Series = mongoose.model('Series', seriesSchema)

export default Series
