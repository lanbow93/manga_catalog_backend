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
router.get('/', async (request, response) => {
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
Purpose: Delete Manga Series From Collection
Params: series._id ''
*/
router.delete('/:id', async (request, response) => {
  try {
    const deletedSeries = await Series.findByIdAndDelete(request.params.id)
    successfulRequest(
      response,
      'Deletion Successful',
      'Collection as been removed',
      deletedSeries
    )
  } catch (error) {
    failedRequest(response, 'Failed Search', 'Unable To Search', error)
  }
})

/*
Update Volumes Status
Purpose: Update Volumes Based Upon New User Input
Needed: volumes [{}]
*/
router.put('/:id', async (request, response) => {
  const { id } = request.params
  try {
    const oldSeries = await Series.findById(id)
    oldSeries.volumes = request.body.volumes
    const newSeries = await Series.findByIdAndUpdate(id, oldSeries, {
      new: true
    })
    successfulRequest(
      response,
      'Successful Update',
      'Collection was successfully updated',
      newSeries
    )
  } catch (error) {
    failedRequest(
      response,
      'Failed To Update',
      'Unable To Update. Please Contact Sitemaster If Issue Persists',
      error
    )
  }
})

/*
Create
Purpose: Creates A Series For User To Track
Needed: mangadexId '' | userId '' | title '' | description '' | completionStatus '' | tags [''] | author '' | coverUrl '' | volumes #
*/
router.post('/', async (request, response) => {
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
  function createVolumeArray(totalVolumes) {
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

/*
Show
Purpose: View a specific collection
Params: series._id ''
*/

router.get('/collections', async (request, response) => {
  const { id } = request.query
  try {
    const seriesData = await Series.find({ userId: id })
    if (seriesData.length > 0) {
      successfulRequest(
        response,
        'Request Successful',
        'Collection Found',
        seriesData
      )
    } else {
      failedRequest(
        response,
        'Nothing Found',
        'No Collections Found For User',
        'No Collections Added'
      )
    }
  } catch (error) {
    failedRequest(
      response,
      'Failed Find Collection',
      'Unable To Find Collection. Contact Sitemaster If Issue Persists',
      error
    )
  }
})

/*
Show
Purpose: View a specific collection
Params: series._id ''
*/

router.get('/collections/:id', async (request, response) => {
  const { id } = request.params
  try {
    const seriesData = await Series.findById(id)
    successfulRequest(
      response,
      'Request Successful',
      'Collection Found',
      seriesData
    )
  } catch (error) {
    failedRequest(
      response,
      'Failed Find Collection',
      'Unable To Find Collection. Contact Sitemaster If Issue Persists',
      error
    )
  }
})

export default router
