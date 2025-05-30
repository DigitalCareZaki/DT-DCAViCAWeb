import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


  try {
    if (!req.headers.authorization) {

      res.status(401).json({ success: false, message: 'JWT missing' });
      return;
    }

    const token = req.headers.authorization.split('Bearer ').at(1);


    if (!token) {

      res.status(401).json({ success: false, message: 'Invalid jwt' });
      return;
    }


    if (!process.env.NEXT_PUBLIC_JWT_SECRET) {

      res.status(401).json({ success: false, message: 'JWT secret not found' });
      return;
    }

    // secret should be in env
    const data = jwt.verify(
      token.toString(),
      process.env.NEXT_PUBLIC_JWT_SECRET as string,
      {
        complete: true,
        ignoreExpiration: false,
      }
    );

    if (!data?.payload) {
      res.status(401).json({ success: false, message: 'Invalid jwt' });

      return;
    }

    // @ts-ignore
    if (!data?.payload?.role) {
      res.status(401).json({ success: false });
      return;
    }

    res.status(200).json({ ...(data.payload as any), token });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
}
