// pages/api/teams/removeTeamMember.ts

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
          // Check if teamId and userId are provided
          if (!teamId || !userId) {
            return res.status(400).json({ success: false, error: 'Missing teamId or userId in the request body' });
          }
  
          // Convert userId to string (if necessary)
          const userIdAsString = String(userId);
  
          const team = await Team.findById(teamId);
          if (!team) {
            return res.status(404).json({ success: false, error: 'Team not found' });
          }
  
          // Check if the user is a member of the team
          const userIndex = team.teamMembers.indexOf(userIdAsString);
          if (userIndex === -1) {
            return res.status(400).json({ success: false, error: 'User is not a member of the team' });
          }
  
          // Remove the user from the team
          team.teamMembers.splice(userIndex, 1);
          await team.save();
  
          return res.status(200).json({ success: true, data: team });
        default:
          return res.status(400).json({ success: false, error: 'Invalid method' });
      }
    } catch (error) {
      console.error('Error removing member from team:', error);
      return res.status(500).json({ success: false, error: 'Server error' });
    }
  }
  