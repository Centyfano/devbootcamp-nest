import * as NodeGeocoder from 'node-geocoder';
import * as dotenv from 'dotenv';
dotenv.config();

const opts: NodeGeocoder.Options = {
  provider: process.env.GEOCODER_PROVIDER,
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

export const geocoder = NodeGeocoder(opts);
