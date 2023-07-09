import * as mongoose from 'mongoose';

const PropertyPortfolioSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

PropertyPortfolioSchema.index({ name: 1 }, { unique: true });
PropertyPortfolioSchema.index(
  { name: 1 },
  {
    collation: {
      locale: 'en',
      strength: 1,
    },
  },
);

export { PropertyPortfolioSchema };
