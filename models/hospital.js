const { Schema, model } = require( 'mongoose' );

// Creación de Hospital
// @ts-ignore
const HospitalSchema = Schema( {
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  usuario: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
  },
} );


HospitalSchema.method( 'toJSON', function () {

  const { __v, ...object } = this.toObject();

  return object;
}, { collection: 'hospitales', } );

module.exports = model( 'Hospital', HospitalSchema );