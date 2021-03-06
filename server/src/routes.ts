import express from 'express';
import { celebrate, Joi } from 'celebrate';

import multer from 'multer';
import multerConfig from './config/multer';

import ItemsController from './controllers/itemsController';
import PointsControllers from './controllers/pointsController';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsControllers = new PointsControllers();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);
routes.get('/points', pointsControllers.index);
routes.get('/points/:id', pointsControllers.show);

routes.post(
    '/points',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            nome: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required()
        })
    },
    {
        abortEarly: false
    }),
    pointsControllers.create);

export default routes;