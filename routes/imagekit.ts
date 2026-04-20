import express, { Request, Response } from 'express';
import ImageKit from 'imagekit';

const router = express.Router();

const imagekit = new ImageKit({
  publicKey: process.env.PUBLIC_IMAGEKIT_KEY as string,
  privateKey: process.env.PRIVATE_IMAGEKIT_KEY as string,
  urlEndpoint: process.env.IMAGE_KIT_URL as string
});

router.get('/auth', (req: Request, res: Response) => {
  try {
    const authenticationParameters = imagekit.getAuthenticationParameters();
    res.json(authenticationParameters);
  } catch (error) {
    console.error('ImageKit Auth Error:', error);
    res.status(500).json({ error: 'Failed to generate ImageKit authentication parameters' });
  }
});

export default router;
