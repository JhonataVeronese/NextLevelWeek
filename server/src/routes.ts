// Arquivo de rotas do sistema
// import do express e extraçao das rodas para uma variavel
import express from 'express';
import Knex from './database/connection';
import PointsController from './Controller/PointsController';
import ItemsController from './Controller/ItemsController';
import multer from 'multer';
import multerConfig from './config/multer';

//-------------------------------------
const routes = express.Router();
// const upload = multer(multerConfig);

const pointController = new PointsController();
const itemsController = new ItemsController();

//-------------------------------------
routes.get('/items', itemsController.index);

routes.post('/points', pointController.create);
routes.get('/points', pointController.index);
routes.get('/points/:id', pointController.show);

// Exporta todas as rodas do arquivo de rota
export default routes;