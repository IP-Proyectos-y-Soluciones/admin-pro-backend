/**
 * Hospitales
 * Ruta: '/api/hospitales'
 */

const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { validarCampos } = require( '../middlewares/validar-campos' );

const { getHospitales, crearHospitales, actualizarHospitales, borrarHospitales, } = require( '../controllers/hospitales' );

const { validarJWT } = require( '../middlewares/validar-jwt' );


const router = Router();

router.get( '/',
  getHospitales
);

router.post( '/',
  [
    /**
     * Validación de campos obligatorios
     */
    validarJWT,
    check( 'name', 'El nombre del Hospital es necesario' ).not().isEmpty(),
    validarCampos,
  ],
  crearHospitales
);

router.put( '/:id',
  [
    /**
     * Validar campos que se van actualizar
     */
    validarJWT,
    check( 'name', 'El nombre del Hospital es necesario' ).not().isEmpty(),
    validarCampos,
  ],
  actualizarHospitales
);

router.delete( '/:id',
  borrarHospitales
);


module.exports = router;