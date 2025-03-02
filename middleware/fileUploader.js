const multer = require('multer');
const constants = require('../constants');

module.exports = multer({ 
    dest: constants.UPLOAD_DIR
}).single(constants.UPLOAD_PROP);