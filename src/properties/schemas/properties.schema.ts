import * as mongoose from "mongoose"

const AddressSchema = new mongoose.Schema({
    addressLineOne: { type: String, required: false },
    description: { type: String, required: true },
    city: { type: String, required: false },
    country: { type: String, required: false },
    postal_code: { type: String, required: false },
    street: { type: String, required: false },
    region: { type: String, required: false },
    home: { type: String, required: false },
})

const PropertiesSchema = new mongoose.Schema({
    portfolioId: { type: mongoose.Types.ObjectId, required: true },
    typeId: { type: mongoose.Types.ObjectId, required: true },
    address: { type: AddressSchema, required: true },
    units: { type: Number, required: true },
    managerIds: { type: [ mongoose.Types.ObjectId ], required: true },
}, {
    timestamps: true
})

PropertiesSchema.index({ "address.description": 1 }, { unique: true });

export { PropertiesSchema };