const commentController = require('../controllers/commentController');

const commentRoute = require('express').Router();


commentRoute.post('/add', commentController.addCmt);
commentRoute.post('/findCmtPostId', commentController.getComment);
module.exports = commentRoute;