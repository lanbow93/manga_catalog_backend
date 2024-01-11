import mongoose from '../config/database.js'

// const mangaSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   author: { type: String, required: true },
//   genre: { type: [String], required: true },
//   seriesId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Series',
//     required: true
//   },
//   publisher: { type: String },
//   publicationDate: { type: Date },
//   coverImageUrl: { type: String },
//   status: { type: String, default: 'Released' },
//   isAdult: { type: Boolean }
// })
// Series Model
// Needed: title | volumes[{ volumeTitle | volumeNumber | mangaId}]
const seriesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: [String], required: true },
  volumes: [
    {
      volumeTitle: { type: String, required: true },
      volumeNumber: { type: Number, required: true },
      mangaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manga',
        required: true
      }
    }
  ],
  idApi: { type: String, required: true, unique: true }
})

const Series = mongoose.model('Series', seriesSchema)

export default Series
//
