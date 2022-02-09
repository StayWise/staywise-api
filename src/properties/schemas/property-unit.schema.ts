import * as mongoose from "mongoose";
import { EUnitStatus } from "../enums/unit-status.enum";

const PropertyUnitSchema = new mongoose.Schema({
    propertyId: { type: mongoose.Types.ObjectId, required: true },
    unitNumber: { type: Number, required: true },
    bathrooms: { type: Number, required: false, default: null },
    bedrooms: { type: Number, required: false, default: null },
    status: { type: String, required: true, default: EUnitStatus.AVAILABLE },
})

export { PropertyUnitSchema };