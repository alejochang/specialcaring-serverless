import * as mongoose from 'mongoose';

const drugSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  type: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  activeIngredient: String,
  unit: String,
  concentration: Number,
  presentation: String,
  quantity: Number
});

export const Drug = mongoose.models.Drug || mongoose.model('Drug', drugSchema, 'drugs');
