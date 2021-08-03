import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { FindCarByIdController } from '@modules/cars/useCases/findCarById/FindCarByIdController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();

const uploadImages = multer(uploadConfig);

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const findCarController = new FindCarByIdController();

carsRoutes.get('/available', listAvailableCarsController.handle);
carsRoutes.get('/:id', ensureAuthenticated, findCarController.handle);

carsRoutes.use([ensureAuthenticated, ensureAdmin]);
carsRoutes.post('/', uploadImages.single('image'), createCarController.handle);
carsRoutes.post('/specifications/:car_id', createCarSpecificationController.handle);

export { carsRoutes };
