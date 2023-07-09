import { ES3Buckets } from 'src/aws/enums/s3Buckets.enum';

export {};

require('dotenv').config();

const config = {
  domain: 'staywiserent.com',
  mongodb: {
    uri: process.env.MONGODB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: 60 * 60 * 24 * 30,
  },
  aws: {
    s3: {
      region: process.env.AWS_DEFAULT_REGION,
      apiVersion: '2006-03-01',
      buckets: {
        [ES3Buckets.PROPERTY_PHOTOS]: 'staywise-property-photos-prod',
      },
    },
    default: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_DEFAULT_REGION,
    },
  },
  google: {
    placesAPI: {
      baseURL: 'https://maps.googleapis.com/maps/api/place',
      apiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
    geocodeAPI: {
      baseURL: 'https://maps.googleapis.com/maps/api/geocode',
      apiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
  },
  sendgrid: {
    key: process.env.SENDGRID_API_KEY,
    from: 'noreply@staywiserent.com',
    to: 'contact@staywiserent.com',
  },
  port: process.env.PORT || 3000,
  origin: {
    whitelist: [
      'https://api.staywiserent.com',
      'https://admin.staywiserent.com',
      'https://www.staywiserent.com',
    ],
  },
};

module.exports = config;
