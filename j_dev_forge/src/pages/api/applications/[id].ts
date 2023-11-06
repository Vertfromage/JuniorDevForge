import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Application from '../../../models/Application';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET': // Get an application by its ID
      try {
        const application = await Application.findById(id);
        if (!application) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: application });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT': // Edit an application by its ID
      try {
        const application = await Application.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!application) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: application });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE': // Delete an application by its ID
      try {
        const deletedApplication = await Application.deleteOne({ _id: id });
        if (!deletedApplication) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
