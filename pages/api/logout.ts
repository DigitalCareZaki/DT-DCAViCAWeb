import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    res.status(200).json({ success: true, message: 'Logout' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
}
