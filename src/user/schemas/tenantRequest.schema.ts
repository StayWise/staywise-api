import * as mongoose from "mongoose";
import { AddressSchema } from "src/properties/schemas/properties.schema";
import { EMeetFormStatus } from "../enums/meet-form-status.enum";

const TenantRequestSchema = new mongoose.Schema(
  {
    address: { type: AddressSchema, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    propertyId: { type: mongoose.Types.ObjectId, required: true },
    requiredBy: { type: Date, required: true },
    additionalInfo: { type: String, required: false, default: null },
    status: { type: String, required: true, default: EMeetFormStatus.OPEN }
  },
  {
    timestamps: true
  }
);

export { TenantRequestSchema };
