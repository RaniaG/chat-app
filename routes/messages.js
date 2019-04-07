var express = require('express');
var router = express.Router();
const MessagesModel = require('../models/message');
var createError = require('http-errors');

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

/* GET messages sent by user */
router.get('/:id/sent', async (req, res, next) => {
    try {
        const messages = await MessagesModel.find({ sender: req.params.id });
        res.send(messages);
    }
    catch (e) {
        next(createError(404, 'user not found'))
    }
});

/* GET messages recieved by user */
router.get('/:id/recieved', async (req, res, next) => {
    try {
        const messages = await MessagesModel.find({ reciever: req.params.id });
        res.send(messages);
    }
    catch (e) {
        next(createError(404, 'user not found'));
    }
});

/* add a new message */
router.post('/', async (req, res, next) => {
    try {
        await MessagesModel.create(req.body);
        res.send(201);
    } catch (e) {
        next(createError(400, 'invalid message'));
    }
});

/* update a message */
router.patch('/', async (req, res, next) => {
    try {
        await MessagesModel.updateOne({ _id: req.body.id }, { message: req.body.message, time: new Date() });
        res.send(202);
    }
    catch (e) {
        next(createError(400, 'invalid message. update failed'));
    }
});

/* delete a message */
router.delete('/', async (req, res, next) => {
    try {
        await MessagesModel.deleteOne({ _id: req.body.id });
        res.send(200);
    }
    catch (e) {
        next(createError(400, 'invalid message. delete failed'));
    }
});


module.exports = router;
