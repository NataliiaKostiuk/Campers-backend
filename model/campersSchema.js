import Joi from "joi";
import { Schema, model } from "mongoose";
import { handleSaveError,addUpdateSettings } from "./hook.js";

const campersSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number},
  location: { type: String, required: true },
  adults: { type: Number },
  children: { type: Number },
  engine: { type: String },
  transmission: { type: String },
  form: { type: String },
  length: { type: String },
  width: { type: String},
  height: { type: String },
  tank: { type: String },
  consumption: { type: String },
  description: { type: String },
  details: {
    airConditioner: { type: Number },
    bathroom: { type: Number },
    kitchen: { type: Number },
    beds: { type: Number },
    TV: { type: Number},
    CD: { type: Number },
    radio: { type: Number },
    shower: { type: Number },
    toilet: { type: Number },
    freezer: { type: Number  },
    hob: { type: Number },
    microwave: { type: Number },
    gas: { type: String },
    water: { type: String }
  },
  gallery: [{ type: String }],
  reviews: [{
    reviewer_name: { type: String },
    reviewer_rating: { type: Number },
      comment: { type: String }
    }],
     favorite: { type: Boolean, default: false },
}, { versionKey: false, timestamps: true });




campersSchema.post('save', handleSaveError);

campersSchema.pre('findOneAndUpdate', addUpdateSettings);

campersSchema.post('findOneAndUpdate', handleSaveError);


export const camperUpdFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})


export const camperAddSchema = Joi.object({
  name: Joi.string().required().messages({
   'any.required': '"name" must be  exist' 
    }),
  price: Joi.number().required().messages({
   'any.required': '"price" must be  exist' 
     }),
  rating: Joi.number(),
  location: Joi.string().required().messages({
    'any.required': '"location" must be  exist' 
    }),
  adults: Joi.number(),
  children: Joi.number(),
  engine: Joi.string(),
  transmission: Joi.string(),
  form: Joi.string(),
  length: Joi.string(),
  width: Joi.string(),
  height: Joi.string(),
  tank: Joi.string(),
  consumption: Joi.string(),
  description: Joi.string(),
  details: Joi.object({
    airConditioner: Joi.number(),
    bathroom: Joi.number(),
    kitchen: Joi.number(),
    beds: Joi.number(),
    TV: Joi.number(),
    CD: Joi.number(),
    radio: Joi.number(),
    shower: Joi.number(),
    toilet: Joi.number(),
    freezer: Joi.number(),
    hob: Joi.number(),
    microwave: Joi.number(),
    gas: Joi.string(),
    water: Joi.string()
  }),
  gallery: Joi.array().items(Joi.string()),
});


const Camper = model('camper', campersSchema);

export default Camper;

