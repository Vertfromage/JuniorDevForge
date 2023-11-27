// pages/api/teams/addTeamMember.ts

import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Team from '../../../models/Team';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    body: { teamId, userId }, // Extract teamId and userId from the request body
  } = req;

  await dbConnect();

  try {
    switch (method) {
      case 'POST':
        const team = await Team.findById(teamId);
        if (!team) {
          return res.status(404).json({ success: false, error: 'Team not found' });
        }

        // Check if the user is already a member of the team
        if (team.teamMembers.includes(userId)) {
          return res.status(400).json({ success: false, error: 'User is already a member of the team' });
        }

        // Add the user to the team
        team.teamMembers.push(userId);
        await team.save();

        return res.status(200).json({ success: true, data: team });
      default:
        return res.status(400).json({ success: false, error: 'Invalid method' });
    }
  } catch (error) {
    console.error('Error adding member to team:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
}
