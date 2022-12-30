const { Schema, model } = require( 'mongoose' );

// Creación de Medico
// @ts-ignore
const MedicoSchema = Schema( {
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
  },
  hospital: {
    type: Schema.Types.ObjectId,
    ref: 'Hospital',
  },
} );


MedicoSchema.method( 'toJSON', function () {

  const { __v, ...object } = this.toObject();

  return object;
} );

module.exports = model( 'Medico', MedicoSchema );