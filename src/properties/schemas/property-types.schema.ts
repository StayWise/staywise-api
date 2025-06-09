import * as mongoose from "mongoose";

const PropertyTypesSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

PropertyTypesSchema.index({ name: 1 }, { unique: true });
PropertyTypesSchema.index(
  { name: 1 },
  {
    collation: {
      locale: "en",
      strength: 1
    }
  }
);

export { PropertyTypesSchema };
