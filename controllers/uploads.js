import path from 'path';
import fs from 'fs';

import { response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { updateImage } from '../helpers/actualizar-imagen.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const fileupload = ( req, res = response ) => {
  
  const type = req.params.type;
  const id = req.params.id;

  /**
   * Validar Tipos
   */
  const validtypes = [ 'hospitales', 'medicos', 'usuarios', ];

  if ( !validtypes.includes( type ) ) {
    return res.status( 400 ).json({
      ok: false,
      msg: 'No es un médico, usuario u Hospital (type)',
    });
  };

  /**
   * Validar que existan archivos
   */
  if ( !req.files || Object.keys( req.files ).length === 0 ) {
    return res.status( 400 ).json({
      ok: false,
      msg: 'Ningún archivo fue cargado',
    });
  };

  /**
   * Procesar la imagen
   */
  const file = req.files.imagen;
 
  const shortname = file.name.split( '.' );
  const fileExtension = shortname[ shortname.length - 1 ];

  /**
   * Validar Extensióon
   */
  const validExtensions = [ 'png', 'jpg', 'jpeg', 'gif', ];

  if ( !validExtensions.includes( fileExtension ) ) {
    return res.status( 400 ).json({
      ok: false,
      msg: 'No es una extensióon permitida.',
    });
  };

  /**
   * Generar el nombre del archivo
   */
  const fileName = `${ uuidv4() }.${ fileExtension }`;

  /**
   * Path para guardar la imagen
   */
  const path = `./uploads/${ type }/${ fileName }`;

  /**
   * Use el método mv() para colocar el archivo en algún lugar del servidor
   */
  file.mv( path, ( err ) => {
    if ( err ) {
      console.error( err );
      return res.status( 500 ).json({
        ok: false,
        msg: 'Error al mover la imagen.',
      });
    };

    /**
     * Actualizar la DB
     */
    updateImage( type, id, fileName, );
    
    res.json({
      ok: true,
      msg: 'Archivo cargado con exito!!',
      fileName,
    });

  });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const returnImage = ( req, res = response ) => {
  
  const type = req.params.type;
  const photo = req.params.photo;

  const pathImg = path.join( __dirname, `../uploads/${ type }/${ photo }` );

  /**
   * Imagen por defecto
   */
  if ( fs.existsSync( pathImg ) ) {
    res.sendFile( pathImg );
  } else {
    const defaultPathImg = path.join( __dirname, `../uploads/no-img.jpg` );
    res.sendFile( defaultPathImg );
  };
};


export { fileupload, returnImage };