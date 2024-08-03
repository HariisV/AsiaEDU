const express = require('express');

const router = express.Router();

const {getByClass, insert, updateLike, postComment} = require("./controller");
const {upload} = require("#utils");

router.get('/get', getByClass);
router.post('/insert', upload('kelas/article').any(), insert);
router.post('/like', updateLike);
router.post('/comment', postComment);

module.exports = router;
