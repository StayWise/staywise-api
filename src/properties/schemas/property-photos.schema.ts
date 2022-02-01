import * as mongoose from "mongoose";

const PropertyPhotoSchema = new mongoose.Schema({
    propertyId: { type: mongoose.Types.ObjectId, required: true },
    eTag: { type: String, required: true },
    url: { type: String, required: true },
    key: { type: String, required: true },
    bucket: { type: String, required: true },
})

export { PropertyPhotoSchema };