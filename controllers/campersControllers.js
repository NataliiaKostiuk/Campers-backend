
import {HttpError} from "../helpers/index.js";
import { camperAddSchema, camperUpdFavoriteSchema  } from "../model/campersSchema.js";
import { controllerWrapper } from "../decorators/index.js";
import Camper from "../model/campersSchema.js";



async function getAll(req, res) {
    const {page = 1, limit = 4} = req.query;
    const skip = (page - 1) * limit;
    const result = await Camper.find({}, '-createdAt -updatedAt', { skip, limit });
    res.json(result); 
}

async function getById  (req, res ) { 
  const { id } = req.params;
  console.log(id);
    const result = await Camper.findById(id);
    if (!result) {
      throw HttpError(404, `Camper with id=${id} not found`);
    }
    res.json(result);  
}

async function postCampers (req, res) {
    const { error } = camperAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await Camper.create(req.body);
  res.status(201).json(result);  
}

async function deleteById (req, res) {
    const { id } = req.params;
    const result = await Camper.findByIdAndDelete(id);
    if (!result) {
      throw HttpError(404, `Camper with id = ${id} not found`);
    } 
     res.json(result)  
} 


async function updateById(req, res) {
 
  const { error } = camperAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message)
  } 
  const { id } = req.params;
  
  const result = await Camper.findByIdAndUpdate(id, req.body);
  if (!result) {
    throw  HttpError(404, `Camper with id=${id} not found`)
  }
  res.json(result);   
}

async function updateStatusCamper(req, res) {
   const { error } = camperUpdFavoriteSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "Missing field favorite");
    }
  const { id } = req.params;
  const result = await Camper.findByIdAndUpdate(id, req.body)
   if (!result) {
    throw HttpError(404, `Camper with id=${id} not found`)
  }
  res.json(result);   

}

export default {
    getAll: controllerWrapper(getAll),
    getById: controllerWrapper(getById),
    postCampers: controllerWrapper(postCampers),
    deleteById: controllerWrapper(deleteById),
    updateById: controllerWrapper(updateById),
    updateStatusCamper: controllerWrapper(updateStatusCamper),
    
}