const express = require('express');
const cloudinary = require('cloudinary').v2;
const fileupload = require('express-fileupload');

const Images = require('./models/images-model');

require('dotenv').config();

const server = express();

server.use(express.json());
server.use(
  fileupload({
    useTempFiles: true
  })
);

server.get('/', (req, res) => {
  res.send('API UP');
});

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

server.post('/persist-image', (req, res) => {
  const file = req.files.photo;

  cloudinary.uploader.upload(file.tempFilePath, function (err, results) {
    Images.add({
      ...req.body,
      image: results.url,
      public_id: results.public_id
    })
      .then((newImage) => {
        Images.findById(newImage[0])
          .then((result) => {
            res.status(201).json(result);
          })
          .catch((err) => {
            res.status(500).json({ msg: 'Fail' });
          });
      })
      .catch((err) => {
        res.status(500).json({ msg: 'Big Fail' });
      });
  });
});

module.exports = server;
