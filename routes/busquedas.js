/**
 * Busquedas
 * Ruta: '/api/:search/'
 */

const { Router } = require('express');
const { validarJWT } = require( '../middlewares/validar-jwt' );

const { getTodo, getDocCollection } = require( '../controllers/busquedas' );


const router = Router();

router.get( '/:search', validarJWT, getTodo );
router.get( '/collection/:table/:search',validarJWT, getDocCollection );


module.exports = router;