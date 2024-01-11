import express from 'express'
import dotenv from 'dotenv'

// Model & Type Imports
import Series from '../models/Series.js'
import Collection from '../models/Collection.js'
import Manga from '../models/Manga.js'

import { successfulRequest, failedRequest } from '../utils/SharedFunctions.js'
import { userLoggedIn } from '../utils/UserVerified.js'
dotenv.config()
const router = express.Router()

const baseUrl = 'https://api.mangadex.org'
router.get('/', userLoggedIn, async (request, response) => {
  const { titleKeyword, isAdult } = request.query
  try {
    const apiResponse = await fetch(
      `${baseUrl}/manga?title=${titleKeyword}&contentRating[]=safe${
        isAdult
          ? '&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic'
          : ''
      }&includes[]=author&includes[]=artist&includes[]=cover_art`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    const parsedData = await apiResponse.json()
    successfulRequest(
      response,
      'Successful Search',
      'Information Attached',
      parsedData
    )
  } catch (error) {
    console.error(error)
    failedRequest(response, 'Failed Search', 'Unable To Search', error)
  }
})

// Gets Image
// https://uploads.mangadex.org/covers/e7d11d14-dbf6-45fe-ab43-848fe81c892a/a6b3030d-2cc1-42a1-9317-d6e6e92b92da.jpg
// https://uploads.mangadex.org/manga/e7d11d14-dbf6-45fe-ab43-848fe81c892a?includes[]=author&includes[]=artist&includes[]=cover_art

export default router
