const express = require('express');

const router = express.Router();

const { changeProfile, changePassword } = require('./controller');
const { upload } = require('#utils');

router.post(
  '/change-profile',
  upload('avatar').single('gambar'),
  changeProfile
);
router.post('/change-password', changePassword);

module.exports = router;
