import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("hii >>>>>>>>>>>>");
  
  try {
    if (!req.headers.authorization) {
      console.log("hii1");
      res.status(401).json({ success: false, message: 'JWT missing' });
      return;
    }

    const token = req.headers.authorization.split('Bearer ').at(1);

    console.log('token >>>>>>>>>>>>>>>>>>>>>>>', token);

    if (!token) {
  console.log("hii2");
  res.status(401).json({ success: false, message: 'Invalid jwt' });
      return;
    }

    console.log('process.env.NEXT_PUBLIC_JWT_SECRET >>>>>>>>>>>>>>>>>>>>>>>', process.env.NEXT_PUBLIC_JWT_SECRET);

    if (!process.env.NEXT_PUBLIC_JWT_SECRET) {
      console.log("hii3");
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

    console.log('data >>>>>>>>>>>>>>>>>>>>>>>', data);

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
