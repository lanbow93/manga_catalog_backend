import mongoose from '../config/database.js'

// Series Model
// Needed: title | volumes[{ volumeTitle | volumeNumber | mangaId}]
const seriesSchema = new mongoose.Schema({
  title: { type: String, required: true },
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
  ]
})

const Series = mongoose.model('Series', seriesSchema)

export default Series
