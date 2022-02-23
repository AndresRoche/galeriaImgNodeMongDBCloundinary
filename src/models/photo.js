const { Schema, model } = require('mongoose');

//con Schema creamos como una plantilla para nuestra base de datos
const schemaPhotos = new Schema({
  title: String,
  description: String,
  imgURL: String,
  public_id: String
});

//le añadimos nuestra plantilla al model
module.exports = model('photo', schemaPhotos);
