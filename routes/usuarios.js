/**
 * Ruta: '/api/usuarios'
 */

const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { validarCampos } = require( '../middlewares/validar-campos' );

const { getUsuarios, createUser } = require( '../controllers/usuarios' );


const router = Router();

router.get( '/', getUsuarios );

router.post( '/',
  [
    // Validació de campos obligatorios
    check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'password', 'El password es obligatorio' ).not().isEmpty(),
    check( 'email', 'El email es obligatorio' ).isEmail(),
    validarCampos,
  ],
  createUser );


module.exports = router;