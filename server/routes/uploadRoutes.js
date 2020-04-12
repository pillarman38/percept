let express = require('express')
let router = express.Router()
let pool = require('../../config/connections')
let fetch = require('node-fetch')
var multer  = require('multer');
let models = require('../models/uploadModels')
var upload = multer({ dest: 'uploads/' })
var bcrypt = require('bcrypt')
var photoPath = "D:/percept/"
var path = require('path')

var storage = multer.diskStorage({
   destination: function(req, file, next) {
       next(null, photoPath);
    },
   filename: function (req, file, next) {

       next(null , file.originalname);
   }
});

var upload = multer({ storage: storage })

router.post('/signup', upload.single('signup'), function (req, res) {

   const saltRounds = 10;
   
   bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(req.body['signup'][2], salt, function(err, hash) {
          models.signUp({
            firstName: req.body['signup'][0],
            lastName: req.body['signup'][1],
            password: hash,
            email: req.body['signup'][3]
         },  (err, results) => {
               if(err){
                   res.send({err: err})
               } 
               if(results) {
                   res.send({results: rssesults})
            }
         })
      });
   });
})

router.post('/uploadPhoto', upload.array('photos', 6), function (req, res, next) {
   console.log(req.files)
   models.uploadPhotos({
      path: `http://192.168.1.86:3001/${req.files[0]['filename']}`,
      email: req.body['photos']
   }, (err, resp) => {
      if(err) {
         res.send({err: err})
      }
      if(resp) {
         res.send({resp: resp})
      }
   }) 
});

router.post('/login', function(req, res) {
   models.login(req, (err, results) => {
      res.send({results: results})
   })
})

router.post('/getPhotos', function(req, res) {
   console.log(req.body)
   models.loadPhotos(req.body, (err, resp) => {
      if(err) {
         res.send({err: err})
      }
      if(resp) {
         res.send({res: resp})
      }
   })
})

module.exports = router