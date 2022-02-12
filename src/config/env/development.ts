import { ES3Buckets } from "src/aws/enums/s3Buckets.enum";

export {};

require("dotenv").config();

const config = {
    mongodb: {
        uri: "mongodb://localhost:27017/staywise",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    },
    jwt: {
        jwtSecret: 'jwtsecret2022',
        jwtExpire: (60 * 60 * 24) * 30,
    },
    aws: {
        s3: {
            region: process.env.AWS_DEFAULT_REGION,
            apiVersion: "2006-03-01",
            buckets: {
                [ ES3Buckets.PROPERTY_PHOTOS ]: "staywise-property-photos-dev",
            }
        },
        default: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_DEFAULT_REGION,
        }
    },
    google: {
        placesAPI: {
            baseURL: "https://maps.googleapis.com/maps/api/place",
            apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
        geocodeAPI: {
            baseURL: "https://maps.googleapis.com/maps/api/geocode",
            apiKey: process.env.GOOGLE_MAPS_API_KEY
        }
    },
    sendgrid: {
        key: "REDACTED",
        from: "noreply@staywiserent.com",
    },
    port: 3000,
}

module.exports = config; 