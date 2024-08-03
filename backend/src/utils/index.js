const email = require('./email');
const deleteFile = require('./delete-file');
const jwt = require('./jwt');
const multer = require('./multer');
const filterToJson = require('./filter-to-json');
const returnPagination = require('./return-pagination');
const generateUniqueINV = require('./generate-invoice');

module.exports = {
  sendMail: email,
  generateToken: jwt.generateToken,
  isTokenValid: jwt.isTokenValid,
  upload: multer.upload,
  deleteFile,
  jwt,
  multer,
  returnPagination,
  filterToJson,
  generateUniqueINV,
};
