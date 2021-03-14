import express from 'express';
import {
  apiHome, apiList, apiMap, apiPony, apiSync,
} from './api';

const router = express.Router();

router.get('/sync/:type', apiSync);
router.get('/list/:type', apiList);
router.get('/pony/:id', apiPony);
router.get('/:type/:id', apiMap);

router.use('/', apiHome);

export default router;
