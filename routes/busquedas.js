/**
 * Busquedas
 * Ruta: '/api/:search/'
 */

import { Router } from 'express';
import { validarJWT } from '../middlewares/validar-jwt.js';

import { getTodo, getDocCollection } from '../controllers/busquedas.js';


const router = Router();

router.get( '/:search', validarJWT, getTodo );
router.get( '/collection/:table/:search', validarJWT, getDocCollection );


export default router;