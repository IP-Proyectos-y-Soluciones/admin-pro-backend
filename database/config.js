const mongoose = require('mongoose');

const dbConnection = async () => {

  try {
    await mongoose.connect( 'mongodb+srv://mean_user:Dqnz99XoiWEeJ9ZI@cluster0.idavas8.mongodb.net/hospitaldb' );
    console.log( 'DB OnLine' );
  } catch ( error ) {
    console.error( error );
    throw new Error( 'Error a la hora de iniciar la BD ver logs' );
  }


  //Dqnz99XoiWEeJ9ZI 
  // mean_user

};

module.exports = { dbConnection, };