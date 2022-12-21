const { Schema, model } = require( 'mongoose' );

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

module.exports = model( 'Usuario', UsuarioSchema );