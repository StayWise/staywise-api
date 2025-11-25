export {};

require("dotenv").config();

const config = {
  domain: "staywiserent.com",
  mongodb: {
    uri: process.env.MONGODB_URI
  },
  jwt: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: 60 * 60 * 24 * 30
  },
  google: {
    placesAPI: {
      baseURL: "https://maps.googleapis.com/maps/api/place",
      apiKey: process.env.GOOGLE_MAPS_API_KEY
    },
    geocodeAPI: {
      baseURL: "https://maps.googleapis.com/maps/api/geocode",
      apiKey: process.env.GOOGLE_MAPS_API_KEY
    }
  },
  sendgrid: {
    key: process.env.SENDGRID_API_KEY,
    from: "noreply@staywiserent.com",
    to: "contact@staywiserent.com"
  },
  cloudinary: {
    cloudName: "staywiserent-cloud",
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET
  },
  port: process.env.PORT || 3000,
  origin: {
    whitelist: [
      "https://api.staywiserent.com",
      "https://admin.staywiserent.com",
      "https://www.staywiserent.com"
    ]
  }
};

module.exports = config;
