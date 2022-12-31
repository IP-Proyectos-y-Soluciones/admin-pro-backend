const fs = require( "fs" );

const Usuario = require( "../models/usuario" );
const Medico = require( "../models/medico" );
const Hospital = require( "../models/hospital" );

const deleteImage = path => {
	if ( fs.existsSync( path ) ) {
		/**
      * Borrar la imagen anterior
      */
    fs.unlinkSync( path );
	}
};

/**
 * 
 * @param {*} type 
 * @param {*} id 
 * @param {*} fileName 
 * @returns 
 */
const updateImage = async ( type, id, fileName ) => {

  let oldPath = '';

	switch ( type ) {
		case "medicos":
      const medico = await Medico.findById( id );

			if ( !medico ) {
        console.log( "No es un médico por id" );
				return false;
			}

      oldPath = `./uploads/medicos/${ medico.img }`;
			deleteImage( oldPath );

			medico.img = fileName;
			await medico.save();
			return true;

			// @ts-ignore
			break;

		case "hospitales":
      const hospital = await Hospital.findById( id );

			if ( !hospital ) {
        console.log( "No es un hospital por id" );
				return false;
			}

      oldPath = `./uploads/hospitales/${ hospital.img }`;
      deleteImage( oldPath );

			hospital.img = fileName;
			await hospital.save();
      return true;
    
			// @ts-ignore
			break;

    case "usuarios":
      const usuario = await Usuario.findById( id );

      if ( !usuario ) {
        console.log( 'No es un usuario por id' );
        return false;
      }

      oldPath = `./uploads/usuarios/${ usuario.img }`;
      deleteImage( oldPath );

      usuario.img = fileName;
      await usuario.save();
      return true;
    
			// @ts-ignore
      break;
    
	}
};

module.exports = { updateImage, };
