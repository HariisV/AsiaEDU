const express = require('express');

const router = express.Router();

const { get, update } = require('./controller');

router.get('/get', get);
router.patch('/update', update);

module.exports = router;
