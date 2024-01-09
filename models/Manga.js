import mongoose from '../config/database.js'

// Manga Model
// Needed: title | auther | genre[] | seriesId | publisher | publicationDate | coverImageUrl | status | isAdult
const mangaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: [String], required: true },
  seriesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Series',
    required: true
  },
  publisher: { type: String },
  publicationDate: { type: Date },
  coverImageUrl: { type: String },
  status: { type: String, default: 'Released' },
  isAdult: { type: Boolean }
})

const Manga = mongoose.model('Manga', mangaSchema)

export default Manga
