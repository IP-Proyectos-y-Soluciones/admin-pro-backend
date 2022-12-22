const { Schema, model } = require( 'mongoose' );

// Creación de Usuario
// @ts-ignore
const UsuarioSchema = Schema( {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: 'USER_ROLE',
  },
  google: {
    type: String,
    default: false,
  },
} );


UsuarioSchema.method( 'toJSON', function () {

  const { __v, _id, ...object } = this.toObject();

  object.uid = _id;

  return object;
} );

module.exports = model( 'Usuario', UsuarioSchema );