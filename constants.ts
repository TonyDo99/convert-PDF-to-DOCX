import ILovePdfApi from '@ilovepdf/ilovepdf-nodejs';
import 'dotenv/config';

export const instance = new ILovePdfApi(
  process.env.PUBLIC_KEY || '',
  process.env.API_KEY || ''
);
