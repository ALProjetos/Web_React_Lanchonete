import express from 'express';
import LancheController from '../controllers/lancheController';
import IngredienteController from '../controllers/ingredienteController';

const router = express.Router();

router.get('/ingredientes/', IngredienteController.getAllRequest);

router.get('/lanches/', LancheController.getAll);
router.get('/lanches/GetLanche/:idLanche', LancheController.getLanche);
router.get('/lanches/GetSumPromocoes', LancheController.getSumPromocoes);

export default router;
