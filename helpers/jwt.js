import jwt from 'jsonwebtoken';

/**
* 
* @param {*} uid 
* @returns 
*/
const generarJWT = ( uid ) => {

  return new Promise( ( resolve, reject ) => {

    const payload = {
      uid,
    };

    jwt.sign( payload, process.env.JWT_SECRET_KEY, {
      expiresIn: '12h',
    }, ( err, token ) => {
      
      if ( err ) {
        console.error( err );
        reject( err );
      } else {
        resolve( token );
      };
    });
  });
  
};


export { generarJWT };