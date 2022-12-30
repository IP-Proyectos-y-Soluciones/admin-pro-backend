/**
 * Medicos
 * Ruta: '/api/medicos'
 */

const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { validarCampos } = require( '../middlewares/validar-campos' );

const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require( '../controllers/medicos' );

const { validarJWT } = require( '../middlewares/validar-jwt' );

const router = Router();

router.get( '/', getMedicos );

router.post(
  '/',
  [
    // Validación de campos obligatorios
    validarJWT,
    check( 'name', 'El nombre del Médico es Obligatorio' ).notEmpty(),
    check( 'hospital', 'El hospital id debe ser valido' ).isMongoId(),
    validarCampos,
  ],
  crearMedico
);

router.put(
  '/:id',
  [
    // Validar campos que se van actualizar
  ],
  actualizarMedico
);

router.delete( '/:id', borrarMedico );

module.exports = router;
