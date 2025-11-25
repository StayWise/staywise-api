export {};

require("dotenv").config();

const config = {
  domain: "localhost",
  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/staywise"
  },
  jwt: {
    jwtSecret: "jwtsecret2022",
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
    to: "contact+dev@staywiserent.com"
  },
  cloudinary: {
    cloudName: "staywiserent-cloud",
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET
  },
  port: 3000,
  origin: {
    whitelist: ["http://localhost:3002", "http://localhost:3001"]
  }
};

module.exports = config;
