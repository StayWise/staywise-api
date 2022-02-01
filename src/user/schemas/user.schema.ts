import * as mongoose from "mongoose";
import { EStatus } from "../enums/status.enum";

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    pass: { type: String, required: true },
    status: { type: String, required: true, default: EStatus.ACTIVE },
    roles: { type: [ String ], required: true }
})

UserSchema.index({ email: 1 }, { unique: true });

export default UserSchema;