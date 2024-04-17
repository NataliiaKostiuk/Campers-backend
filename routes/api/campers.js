import express from "express";

import campersControllers from '../../controllers/campersControllers.js';

import {isEmptyBody, isValidId} from "../../middlewares/index.js";


const campersRouter = express.Router();


campersRouter.get('/', campersControllers.getAll);

campersRouter.get('/:id', isValidId, campersControllers.getById);

campersRouter.post('/',isEmptyBody, campersControllers.postCampers);

campersRouter.delete('/:id', isValidId, campersControllers.deleteById);

campersRouter.put('/:id', isValidId, isEmptyBody, campersControllers.updateById);

campersRouter.patch('/:id/favorite', isValidId, isEmptyBody, campersControllers.updateStatusCamper);


export default campersRouter;