/**
 * Busquedas
 * Ruta: '/api/uploads/'
 */

import { Router } from 'express';
import expressfileUpload from 'express-fileupload';

import { validarJWT } from '../middlewares/validar-jwt.js';
import { fileupload, returnImage } from '../controllers/uploads.js';

const router = Router();
router.use( expressfileUpload() );

router.put( '/:type/:id', validarJWT, fileupload );
router.get( '/:type/:photo', returnImage );

export default router;  
