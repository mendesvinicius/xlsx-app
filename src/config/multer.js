const multer = require('multer');
const path = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..','src', 'tmp', 'uploads'),
        filename: (req, file, cb, err) => {
            if(err) return cb(err);
            return cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
        } ,
        headers: {"X-API-KEY": "__KEY__", "Access-Control-Allow-Origin": "true"},
        fileFilter: function(req, file, cb) {
            if(["xls", "xlsx"].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                return cb(new Error("Wrong extension type"))
            }
            cb(null, true)
    } 
    })
}