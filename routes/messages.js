var express = require('express');
var router = express.Router();
const MessagesModel = require('../models/message');
var createError = require('http-errors');
const authMiddleware= require('../middlewares/authorization');


router.use(authMiddleware);

/* GET messages sent by user */
router.get('/sent', async (req, res, next) => {
    try {
        // debugger;
        await MessagesModel
        .find({ sender: req.loggedUser.id })
        .populate('reciever','username')
        .populate('sender','username')
        .exec(function (err,messages){
            res.send(messages);
        })
    }
    catch (e) {
        next(createError(401, 'cant retrieve messages'))
    }
});

/* GET messages recieved by user */
router.get('/recieved', async (req, res, next) => {
    try {
        await MessagesModel
        .find({ reciever: req.loggedUser.id })
        .populate('reciever','username')
        .populate('sender','username')
        .exec(function (err,messages){
            res.send(messages);
        })
    }
    catch (e) {
        next(createError(401, 'cant retrieve messages'));
    }
});

/* send a new message */
router.post('/', async (req, res, next) => {
    try {
        // debugger;
        await MessagesModel.create({...req.body,sender:req.loggedUser._id});
        res.send(201);
    } catch (e) {
        next(createError(400, 'unable to send message'));
    }
});

/* update a message */
router.patch('/', async (req, res, next) => {
    try {
        await MessagesModel.updateOne({ _id: req.body.id }, { message: req.body.message, time: new Date() });
        res.send(202);
    }
    catch (e) {
        next(createError(400, 'update failed'));
    }
});

/* delete a message */
router.delete('/', async (req, res, next) => {
    try {
        await MessagesModel.deleteOne({ _id: req.body.id });
        res.send(200);
    }
    catch (e) {
        next(createError(400, 'delete failed'));
    }
});

/* GET all messages */
router.get('/', async (req, res, next) => {
    try {
        const messages = await MessagesModel.find({});
        res.send(messages);
    }
    catch (e) {
        next(createError(400, 'unable to retrieve messages'));
    }
});

module.exports = router;
