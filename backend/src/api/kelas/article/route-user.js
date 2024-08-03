const express = require('express');

const router = express.Router();

const {getByClass, insert, updateLike, postComment} = require("./controller");

router.get('/get', getByClass);
router.post('/insert', insert);
router.post('/like', updateLike);
router.post('/comment', postComment);

module.exports = router;
