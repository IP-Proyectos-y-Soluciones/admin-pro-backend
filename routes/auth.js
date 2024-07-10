/**
 * Ruta: '/api/login'
 */

import { Router } from 'express';
import { login, googleSignIn, renewToken } from '../controllers/auth.js';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';


const router = Router();

router.post( '/',
  [
    check( 'email', 'El email es obligatorio' ).isEmail(),
    check( 'password', 'El password es obligatorio' ).not().isEmpty(),
    validarCampos,
  ],
  login, 
);

router.post( '/google',
  [
    check( 'token', 'El Token de Google es obligatorio' ).not().isEmpty(),
    validarCampos,
  ],
  googleSignIn, 
);

router.get( '/renew',
  validarJWT,
  renewToken 
);


export default router;