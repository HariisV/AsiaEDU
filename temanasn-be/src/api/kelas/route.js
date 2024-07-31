const express = require('express');

const router = express.Router();

const { get, find, insert, update, remove } = require('./controller');
const { upload } = require('#utils');

router.get('/get', get);
router.get('/find/:id', find);
router.post('/insert', upload('kelas').single('gambar'), insert);
router.patch('/update/:id', upload('kelas').single('gambar'), update);
router.delete('/remove/:id', remove);
// router.get('/excel', excel);

module.exports = router;
