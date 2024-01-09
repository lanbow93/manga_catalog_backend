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
      }`,
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

export default router
