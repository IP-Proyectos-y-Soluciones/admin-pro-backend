/**
 * Ruta: '/api/usuarios'
 */

const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { validarCampos } = require( '../middlewares/validar-campos' );

const { getUsuarios, createUser, actualizarUsuario, borrarUsuario } = require( '../controllers/usuarios' );
const { validarJWT } = require( '../middlewares/validar-jwt' );


const router = Router();

router.get( '/', validarJWT, getUsuarios );

router.post( '/',
  [
    // Validación de campos obligatorios
    check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'password', 'El password es obligatorio' ).not().isEmpty(),
    check( 'email', 'El email es obligatorio' ).isEmail(),
    validarCampos,
  ],
  createUser );

router.put( '/:id',
  [
    // Validar campos que se van actualizar
    validarJWT,
    check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'email', 'El email es obligatorio' ).isEmail(),
    check( 'role', 'El role es obligatorio' ).not().isEmpty(),
    validarCampos,
  ],
  actualizarUsuario );

  router.delete( '/:id', validarJWT, borrarUsuario );


module.exports = router;