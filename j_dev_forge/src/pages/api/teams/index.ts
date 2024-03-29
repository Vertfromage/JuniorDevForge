/**Based off Pets/with-mongodb-mongoose example: with https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose */

import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import Team from '../../../models/Team'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const teams = await Team.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: teams })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const team = await Team.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: team })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}