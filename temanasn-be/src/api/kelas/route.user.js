const express = require('express');

const router = express.Router();

const { get, find, join, getMyClass } = require('./controller');

router.get('/get', get);
router.get('/find/:id', find);
router.post('/join', join);
router.get('/my-class', getMyClass);

module.exports = router;
