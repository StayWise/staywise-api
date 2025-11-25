import * as mongoose from "mongoose";

const PropertyPhotoSchema = new mongoose.Schema({
  propertyId: { type: mongoose.Types.ObjectId, required: true },
  publicId: { type: String, required: true },
  url: { type: String, required: true }
});

export { PropertyPhotoSchema };
