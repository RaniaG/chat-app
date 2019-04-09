var express = require('express');
var router = express.Router();
var createError = require('http-errors');
const UserModel = require('../models/user');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const allUsers = await UserModel.find({});
    res.send(allUsers);
  }
  catch (e) {
    next(createError(400, 'unable to get users'));
  }
});

/* add a new user */
router.post('/', async (req, res, next) => {
  try {
    await UserModel.create(req.body);
    res.send(201);
  } catch (e) {
    next(createError(400, 'invalid user data'));
  }
});

/* GET user by id. */
router.get('/:id', async (req, res, next) => {
  try {
    const allUsers = await UserModel.findById(req.params.id);
    res.send(allUsers);
  }
  catch (e) {
    next(createError(404, 'user not found'))
  }
});

/* update a user */
router.patch('/', async (req, res, next) => {
  try {
    debugger;
    await UserModel.updateOne({ _id: req.body._id }, req.body);
    res.sendStatus(202);
  }
  catch (e) {
    next(createError(400, 'invalid user. update failed'));
  }
});

/* delete a user */
router.delete('/', async (req, res, next) => {
  try {
    await UserModel.deleteOne({ _id: req.body._id });
    res.sendStatus(200);
  }
  catch (e) {
    next(createError(400, 'invalid user. delete failed'));
  }
});

/** Login */
router.post('/login', async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (!await user.verifyPassword(req.body.password)) throw 'invalid password'
    const token = await user.generateToken();
    res.send(token);
  } catch (e) {
    next(createError(401, 'invalid credentials'));
  }
});
module.exports = router;
