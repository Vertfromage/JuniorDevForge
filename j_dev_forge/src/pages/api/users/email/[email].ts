/** Based off Pets / with-mongodb-mongoose example: with https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose */

import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../../lib/dbConnect'
import User from '@/models/User'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { email },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its email */:
      try {
        let user;
        if (email) {
          console.log("finding by email");
          user = await User.findOne({ email });
        } else {
          console.log("Error, no id or email")
          return res.status(400).json({ success: false, message: 'Missing email parameter' });
        }

        if (!user) {
          return res.status(200).json({ success: false });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
    break
}
}