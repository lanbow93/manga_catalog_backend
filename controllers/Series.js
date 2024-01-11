import express from 'express'
import dotenv from 'dotenv'

// Model & Type Imports
import Series from '../models/Series.js'

import { successfulRequest, failedRequest } from '../utils/SharedFunctions.js'
import { userLoggedIn } from '../utils/UserVerified.js'
dotenv.config()
const router = express.Router()

const baseUrl = 'https://api.mangadex.org'

/*
Index
Purpose: Search for Manga Series TO Add
Needed: titleKeyword '' | isAdult {0,1}
*/
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
    failedRequest(response, 'Failed Search', 'Unable To Search', error)
  }
})

/*
Destroy
Purpose: Search for Manga Series TO Add
Params: series._id ''
*/
router.delete('/:id', async (request, response) => {
  try{
    const deletedSeries = await Series.findByIdAndDelete(request.params.id);
    successfulRequest(response, "Deletion Successful", "Collection as been removed", deletedSeries)
  }catch (error) {
    failedRequest(response, 'Failed Search', 'Unable To Search', error)
  }
})

/*
Create
Purpose: Creates A Series For User To Track
Needed: mangadexId '' | userId '' | title '' | description '' | completionStatus '' | tags [''] | author '' | coverUrl '' | volumes #
*/
router.post('/', userLoggedIn, async (request, response) => {
  const {
    mangadexId,
    userId,
    title,
    description,
    completionStatus,
    tags,
    author,
    coverUrl,
    volumes
  } = request.body
  function createVolumeArray (totalVolumes) {
    const volumes = []
    for (let i = 1; i <= totalVolumes; i++) {
      volumes.push({
        volumeNumber: i,
        status: 'Need To Purchase'
      })
    }

    return volumes
  }
  try {
    const seriesObject = {
      mangadexId,
      userId,
      title,
      description,
      completionStatus,
      tags,
      author,
      coverUrl,
      volumes: createVolumeArray(volumes)
    }

    const newSeries = await Series.create(seriesObject)
    successfulRequest(
      response,
      'Request Successful:',
      'New Collection Added',
      newSeries
    )
  } catch (error) {
    failedRequest(response, 'Failed To Add', 'Unable To Add', error)
  }
})

export default router
