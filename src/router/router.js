const { Router } = require('express');

const router = Router();

const Photos = require('../models/photo');
const cloundinary = require('cloudinary');

cloundinary.config({
  cloud_name: process.env.CLOUNDINARY_NAME,
  api_key: process.env.CLOUNDINARY_API_KEY,
  api_secret: process.env.CLOUNDINARY_API_SECRET
})

const fs = require('fs-extra');

router.get('/', async (req, res) => {
    const photos = await Photos.find().lean();//hace la consulta a todas la imagenes
    console.log(photos);
    res.render('image', {photos});
});

router.get('/images/add', async (req, res) => {
  const photos = await Photos.find().lean();//hace la consulta a todas la imagenes

  res.render('image_form', { photos });
});


router.post('/images/add',  async (req , res) => {
  console.log(req.body);
  const { title, description } = req.body;
  console.log(req.file);

  // enviamos el archovo a cloufinary
  const result_nube = await cloundinary.v2.uploader.upload(req.file.path)
  console.log(result_nube);


  
  // le damos los datos para la DB
  const newPhotos = new Photos({
    title: title,
    description: description,
    imgURL: result_nube.secure_url,
    public_id : result_nube.public_id
  })
  await newPhotos.save();//lo guardamamos
  await fs.unlink(req.file.path);//eleminamos la imagen de upload
  res.redirect('/');
});





router.get('/images/delete/:photo_id', async (req, res) => {
  const { photo_id } = req.params;
  const photo_delete = await Photos.findByIdAndDelete(photo_id);
  const resultaTheDelete = await cloundinary.v2.uploader.destroy(photo_delete.public_id);
  console.log(resultaTheDelete)
  res.redirect('/');
})
module.exports = router;
