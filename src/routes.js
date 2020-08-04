const {Router} = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const multerConfig = require('./config/multer')
const xlsxtojson = require('xlsx-to-json-lc')
const xlstojson = require('xls-to-json-lc')


const routes = new Router();
const upload = multer(multerConfig);


let files = [];

routes.post('/upload', upload.single('file'), (req, res) => {
  let exceltojson;
  /* upload(req, res, function(err){
    if(err) {
      res.json({error_code:1, err_desc: err});
      return;
    }

    if(!req.file) {
      res.json({error_code: 1, err_desc:"No file passed"})
      return;
    } */

    if(req.file.originalname.split('.')[req.file.originalname.split('.').length -1] === "xlsx"){
      exceltojson = xlsxtojson;
      console.log(req.file.originalname);
    } else {
      exceltojson = xlstojson
    }
    console.log(req.file.path);

    try {
      exceltojson({
        input: req.file.path,
        output: null,
        lowerCaseHeaders: true
      }, function(err, result) {
        if(err) {
          return res.json({error_code:1, err_desc: err, data:null});
        }
        res.json({error_code:0, err_desc: null, data: result})
          files.unshift(result)
      });
    } catch(e) {
      res.json({error_code: 1, err_desc: "Corrupted excel file"})
    }
  });
/* }) */
routes.get('/upload', (req, res) => {
  return  res.json(files[0])
});


module.exports = routes;