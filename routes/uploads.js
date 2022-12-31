/**
 * Busquedas
 * Ruta: '/api/uploads/'
 */

const { Router } = require( 'express' );
const expressfileUpload = require( 'express-fileupload' );

const { validarJWT } = require( '../middlewares/validar-jwt' );
const { fileupload, returnImage } = require( '../controllers/uploads' );

const router = Router();
router.use( expressfileUpload() );

router.put( '/:type/:id', validarJWT, fileupload );
router.get( '/:type/:photo', returnImage );

module.exports = router;  
