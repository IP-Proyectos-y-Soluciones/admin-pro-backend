/**
 * Busquedas
 * Ruta: '/api/uploads/'
 */

const { Router } = require( 'express' );
const expressfileUpload = require( 'express-fileupload' );

const { validarJWT } = require( '../middlewares/validar-jwt' );
const { fileupload } = require( '../controllers/uploads' );

const router = Router();
router.use( expressfileUpload() );

router.put( '/:type/:id', validarJWT, fileupload );

module.exports = router;  
