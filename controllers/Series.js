import express from 'express'
import dotenv from 'dotenv'

// Model & Type Imports
import Series from '../models/Series.js'

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
    const seriesData = parsedData.data.map((series) => {
      return {
        mangadexId: series.id,
        title: series.attributes.title.en,
        description: series.attributes.description.en,
        completionStatus: series.attributes.status,
        tags: series.attributes.tags.map(
          (tagArray) => tagArray.attributes.name.en
        ),
        author: series.relationships[0].attributes.name,
        coverUrl: `https://uploads.mangadex.org/covers/${series.id}/${series.relationships[2].attributes.fileName}`
      }
    })
    successfulRequest(
      response,
      'Successful Search',
      'Information Attached',
      seriesData
    )
  } catch (error) {
    console.error(error)
    failedRequest(response, 'Failed Search', 'Unable To Search', error)
  }
})

router.post('/new', userLoggedIn, async (request, response) => {
  const {mangadexId, userId, title, description, completionStatus, tags, author, coverFileName, volumes} = request.body
  const seriesObject = {
    mangadexId,
    userId,
    title,
    description,
    completionStatus,
    tags,
    author,
    coverFileName,
    

  }
})


export default router
